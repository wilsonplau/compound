import React, { useState, useEffect } from 'react';

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
      <small>ACCOUNT BALANCES</small>
      <div className="balances__ETH">
        <small>ETH</small>
        <h1>{ ethBalance.toString() }</h1>
      </div>
      <div className="balances__DAI">
        <small>DAI</small>
        <h1>{ daiBalance.toString() }</h1>
      </div>
    </div>
  );
}

export default Balances;