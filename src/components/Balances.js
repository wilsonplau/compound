import React, { useState, useEffect } from 'react';
import daiIcon from '../images/dai.svg'
import ethIcon from '../images/eth.svg'
import '../styles/Balances.scss'

const Balances = ({ maker }) => {
  const [ethBalance, setEthBalance] = useState(0);
  const [daiBalance, setDaiBalance] = useState(0);

  useEffect(() => {
    const init = async () => {
      const tokenService = maker.service('token');
      const dai = tokenService.getToken('DAI');
      const eth = tokenService.getToken('ETH');
      const [daiBalance, ethBalance] = await Promise.all([dai.balance(),eth.balance()])
      setDaiBalance(daiBalance);
      setEthBalance(ethBalance);
    }
    if (maker) init();
  }, [maker])

  return (
    <div className="balances">
      <div className="balances__item balances__ETH">
        <small>ETH BALANCE</small>
        <h1><img src={ethIcon} />{ ethBalance.toString() }</h1>
      </div>
      <div className="balances__item balances__DAI">
        <small>DAI BALANCE</small>
        <h1><img src={daiIcon} />{ daiBalance.toString() }</h1>
      </div>
    </div>
  );
}

export default Balances;