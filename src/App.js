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

const CETH_ABI = require('./ABI/cETH');
const CDAI_ABI = require('./ABI/cDAI');
const CETH_KOVAN_ADDRESS = "0xd83f707f003a1f0b1535028ab356fce2667ab855";
const CDAI_KOVAN_ADDRESS = "0x0a1e4d0b5c71b955c0a5993023fc48ba6e380496";

const App = () => {
  const [web3] = useState(new Web3(window.ethereum));
  const [address, setAddress] = useState("");
  const [maker, setMaker] = useState();
  const [cETH, setcETH] = useState();
  const [cDAI, setcDAI] = useState()
  const [cDAIData, setcDAIData] = useState({});
  const { USDJPY } = useFX();

  const [annualSaving, setAnnualSaving] = useState(1000000);
  
  useEffect(() => {
    const init = async () => {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();  
      setAddress(accounts[0]);
      const makerBrowser = await Maker.create('browser', { plugins: [Eth2DaiDirect] });
      setMaker(makerBrowser);
      setcETH(new web3.eth.Contract(CETH_ABI, CETH_KOVAN_ADDRESS));
      setcDAI(new web3.eth.Contract(CDAI_ABI, CDAI_KOVAN_ADDRESS));
      getcDaiInfo();
    }
    init();
  }, []);

  const getcDaiInfo = async() => {
    const response = await axios.get("https://api.compound.finance/api/v2/ctoken");
    const cDai = response.data.cToken.find((token) => token.symbol === "cDAI");
    setcDAIData(cDai);
  }

  return (
    <div className="App"> 
      <SavingsAccount cDAI={cDAI} address={address} cDAIData={cDAIData} USDJPY={USDJPY} annualSaving={annualSaving} setAnnualSaving={setAnnualSaving} />
      <Visualization annualSaving={annualSaving} cDAIData={cDAIData} USDJPY={USDJPY} />
      <div className="bottom">
        <Balances maker={maker} USDJPY={USDJPY} />
        <Exchange maker={maker} USDJPY={USDJPY} />
        <Deposit annualSaving={annualSaving} USDJPY={USDJPY} />
      </div>
    </div>
  );
}

export default App;
 