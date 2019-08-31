import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner'
import daiIcon from '../images/dai.svg'
import ethIcon from '../images/eth.svg'
import '../styles/Balances.scss'

const DAI_ABI = require('../ABI/ERC20');
const DAI_KOVAN_ADDRESS = "0xbf7a7169562078c96f0ec1a8afd6ae50f12e5a99";
const Balances = ({ address, web3, USDJPY, refreshState, ETHUSD, loading, setLoadingSingle }) => {
  const [ethBalance, setEthBalance] = useState(0);
  const [daiBalance, setDaiBalance] = useState(0);

  useEffect(() => {
    const init = async () => {
      const ebal = await web3.eth.getBalance(address);
      setEthBalance(ebal/Math.pow(10, 18));
      setLoadingSingle({ethBalance: false})
      const daiContract = new web3.eth.Contract(DAI_ABI, DAI_KOVAN_ADDRESS);
      const dbal = await daiContract.methods.balanceOf(address).call();
      setDaiBalance(dbal/Math.pow(10, 18));
      setLoadingSingle({daiBalance: false})
    }
    if (web3 && address) init();
  }, [web3, address, refreshState, setLoadingSingle])

  return (
    <div className="balances">
      <div className="balances__item">
        { loading.ethBalance && <div className="balances__loading"><Loader type="TailSpin" color="#ECC94B" height={50} width={50} /></div>}
        <small>ETH BALANCE</small>
        <h1><img src={ethIcon} alt="ETH" />{ ethBalance && ethBalance.toFixed(2) }</h1>
        <h2>( ~¥{ ethBalance && (ethBalance * ETHUSD * USDJPY).toFixed(0) })</h2>
      </div>
      <div className="balances__item">
        { loading.daiBalance && <div className="balances__loading"><Loader type="TailSpin" color="#ECC94B" height={50} width={50} /></div>}
        <small>DAI BALANCE</small>
        <h1><img src={daiIcon} alt="DAI" />{ daiBalance && daiBalance.toFixed(2) }</h1>
        <h2>( ~¥{ daiBalance && (daiBalance* USDJPY).toFixed(0) })</h2>
      </div>
    </div>
  );
}

export default Balances;