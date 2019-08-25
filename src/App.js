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
  const [address, setAddress] = useState("");
  const [maker, setMaker] = useState();
  const [cDAI, setcDAI] = useState()
  const [cDaiData, setcDaiData] = useState({});
  const { USDJPY } = useFX();
  const [ETHUSD, setETHUSD] = useState(0);
  const [refreshState, setRefreshState] = useState(false);
  const [annualSaving, setAnnualSaving] = useState(1000000);
  
  const [cDaiBalance, setcDaiBalance] = useState(0);
  useEffect(() => {
    const init = async () => {
      const balance = await cDAI.methods.balanceOfUnderlying(address).call();
      setcDaiBalance((balance / Math.pow(10, 18)).toFixed(2));
    }
    if (cDAI && address) init();
  }, [cDAI, address, refreshState])


  useEffect(() => {
    const init = async () => {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();  
      setAddress(accounts[0]);
      const makerBrowser = await Maker.create('browser', { plugins: [Eth2DaiDirect] });
      setMaker(makerBrowser);
      const priceService = makerBrowser.service('price');
      const ethPrice = await priceService.getEthPrice();
      setETHUSD(ethPrice.toNumber());
      setcDAI(new web3.eth.Contract(CDAI_ABI, CDAI_KOVAN_ADDRESS));
      getcDaiInfo();
    }
    init();
  }, []);

  const refreshBalances = () => {
    setRefreshState(!refreshState);
  }

  const getcDaiInfo = async() => {
    const response = await axios.get("https://api.compound.finance/api/v2/ctoken");
    const cDai = response.data.cToken.find((token) => token.symbol === "cDAI");
    setcDaiData(cDai);
  }

  return (
    <div className="App"> 
      <SavingsAccount cDAI={cDAI} address={address} cDaiBalance={cDaiBalance} cDaiData={cDaiData} USDJPY={USDJPY} refreshState={refreshState} annualSaving={annualSaving} setAnnualSaving={setAnnualSaving} />
      <Visualization annualSaving={annualSaving} cDaiData={cDaiData} USDJPY={USDJPY} />
      <div className="bottom">
        <Balances USDJPY={USDJPY} refreshState={refreshState} address={address} web3={web3} ETHUSD={ETHUSD}/>
        <Exchange maker={maker} USDJPY={USDJPY} refreshBalances={refreshBalances} />
        <Deposit web3={web3} annualSaving={annualSaving} USDJPY={USDJPY} cDAI={cDAI} address={address} refreshBalances={refreshBalances} />
      </div>
    </div>
  );
}

export default App;
 