import React, { useEffect, useState } from 'react';
import Eth2DaiDirect from '@makerdao/dai-plugin-eth2dai-direct';
import Maker from '@makerdao/dai';
import Web3 from 'web3';
import axios from 'axios';

import './styles/Reset.scss'
import './styles/App.scss'
import './styles/Styles.scss'

import Balances from './components/Balances';
import SavingsAccount from './components/SavingsAccount';
import Visualization from './components/Visualization';
import Exchange from './components/Exchange'
import Deposit from './components/Deposit'
import useFX from './helpers/useFX'

const CDAI_ABI = require('./ABI/cDAI');
const CDAI_KOVAN_ADDRESS = "0x0a1e4d0b5c71b955c0a5993023fc48ba6e380496";

const App = () => {
  const [web3] = useState(new Web3(window.ethereum));
  const [maker, setMaker] = useState();
  const [cDAI, setcDAI] = useState()

  const [address, setAddress] = useState("");
  const [cDaiData, setcDaiData] = useState({});
  const [cDaiBalance, setcDaiBalance] = useState(0);
  const { USDJPY } = useFX();
  const [ETHUSD, setETHUSD] = useState(0);
  const [refreshState, setRefreshState] = useState(false);
  const [annualSaving, setAnnualSaving] = useState(1000000);

  const [loading, setLoading] = useState({ethBalance: true, daiBalance: true, savingsBalance: true})
  const setLoadingSingle = (state) => {
    setLoading((prevLoading) => ({...prevLoading, ...state}));
  }

  useEffect(() => {
    const init = async () => {
      const balance = await cDAI.methods.balanceOfUnderlying(address).call();
      setcDaiBalance((balance / Math.pow(10, 18)).toFixed(2));
      setLoadingSingle({savingsBalance: false})
    }
    if (cDAI && address) init();
  }, [cDAI, address, refreshState])

  useEffect(() => {
    const init = async () => {
      const priceService = maker.service('price');
      const ethPrice = await priceService.getEthPrice();
      setETHUSD(ethPrice.toNumber());
    }
    if (maker) init();
  }, [maker])

  useEffect(() => {
    const init = async () => {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();  
      setAddress(accounts[0]);
      const makerBrowser = await Maker.create('browser', { plugins: [Eth2DaiDirect] });
      setMaker(makerBrowser);
      setcDAI(new web3.eth.Contract(CDAI_ABI, CDAI_KOVAN_ADDRESS));
      getcDaiInfo();
    }
    init();
  }, [web3]);

  const refreshBalances = () => {
    setRefreshState(!refreshState);
  }

  const getcDaiInfo = async() => {
    const response = await axios.get("https://api.compound.finance/api/v2/ctoken");
    const cDai = response.data.cToken.find((token) => token.symbol === "cDAI");
    setcDaiData(cDai);
  }

  return (
    <div className="app"> 
      <SavingsAccount cDaiBalance={cDaiBalance} cDaiData={cDaiData} USDJPY={USDJPY} annualSaving={annualSaving} setAnnualSaving={setAnnualSaving} loading={loading} />
      <Visualization cDaiBalance={cDaiBalance} cDaiData={cDaiData} annualSaving={annualSaving} USDJPY={USDJPY} />
      <div className="app__bottom">
        <Balances address={address} web3={web3} USDJPY={USDJPY} refreshState={refreshState} ETHUSD={ETHUSD} loading={loading} setLoadingSingle={setLoadingSingle} />
        <Exchange maker={maker} refreshBalances={refreshBalances} />
        <Deposit web3={web3} annualSaving={annualSaving} USDJPY={USDJPY} cDAI={cDAI} address={address} refreshBalances={refreshBalances} setLoadingSingle={setLoadingSingle} />
      </div>
    </div>
  );
}

export default App;
 