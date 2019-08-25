import React, { useState, useEffect } from 'react';
import daiIcon from '../images/dai.svg'
import ethIcon from '../images/eth.svg'
import '../styles/Balances.scss'

const DAI_ABI = require('../ABI/ERC20');
const DAI_KOVAN_ADDRESS = "0xbf7a7169562078c96f0ec1a8afd6ae50f12e5a99";
const Balances = ({ address, web3, USDJPY, refreshState, ETHUSD }) => {
  const [ethBalance, setEthBalance] = useState(0);
  const [daiBalance, setDaiBalance] = useState(0);

  useEffect(() => {
    const init = async () => {
      const ebal = await web3.eth.getBalance(address);
      setEthBalance(ebal/Math.pow(10, 18));
      const daiContract = new web3.eth.Contract(DAI_ABI, DAI_KOVAN_ADDRESS);
      const dbal = await daiContract.methods.balanceOf(address).call();
      setDaiBalance(dbal/Math.pow(10, 18));
    }
    if (web3 && address) init();
  }, [web3, address, refreshState])

  return (
    <div className="balances">
      <div className="balances__item">
        <small>ETH BALANCE</small>
        <h1><img src={ethIcon} />{ ethBalance && ethBalance.toFixed(2) }</h1>
        <h2>( ~¥{ ethBalance && (ethBalance * ETHUSD * USDJPY).toFixed(0) })</h2>
      </div>
      <div className="balances__item">
        <small>DAI BALANCE</small>
        <h1><img src={daiIcon} />{ daiBalance && daiBalance.toFixed(2) }</h1>
        <h2>( ~¥{ daiBalance && (daiBalance* USDJPY).toFixed(0) })</h2>
      </div>
    </div>
  );
}

export default Balances;