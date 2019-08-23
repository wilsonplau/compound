import React, { useState, useEffect } from 'react';

const SavingsAccount = ({ address, cDAI, cDAIData }) => {
  const [cDaiBalance, setcDaiBalance] = useState(0);

  useEffect(() => {
    const init = async () => {
      const balance = await cDAI.methods.balanceOfUnderlying(address).call();
      setcDaiBalance(balance);
    }
    if (cDAI && address) init();
  }, [cDAI, address])

  return (
    <div>
      <h1>{ cDaiBalance }</h1>
      <h2>Current interest rate: { cDAIData.supply_rate && cDAIData.supply_rate.value }</h2>
      <h2>Interest earned to date: </h2>I
    </div>
  );
}

export default SavingsAccount;