import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import '../styles/SavingsAccount.scss';
import 'rc-slider/assets/index.css';
import daiIcon from '../images/dai.svg'

const SavingsAccount = ({ address, cDAI, cDAIData, USDJPY, monthlySaving, setMonthlySaving }) => {
  const [cDaiBalance, setcDaiBalance] = useState(0);

  useEffect(() => {
    const init = async () => {
      const balance = await cDAI.methods.balanceOfUnderlying(address).call();
      setcDaiBalance((balance / Math.pow(10, 18)).toFixed(2));
    }
    if (cDAI && address) init();
  }, [cDAI, address])

  return (
    <div className="savingsAccount">
      <small>YOUR SAVINGS ACCOUNT</small>
      <h1><img src={daiIcon} />{ cDaiBalance } <span>(¥{ (cDaiBalance * USDJPY).toFixed(0) })</span> </h1>
      <h2><strong>Current interest rate:</strong> { cDAIData.supply_rate && `${(cDAIData.supply_rate.value * 100).toFixed(2)}%` }</h2>
      <h2><strong>Interest earned to date:</strong> { cDaiBalance && (cDaiBalance - 180).toFixed(2) }</h2>

      <div className="savingsAccount__slider">
        <h2><strong>How much do you want to save per year?</strong> ¥{monthlySaving.toLocaleString()}</h2>
        <Slider min={0} max={10000000} step={10000} value={monthlySaving} onChange={(val) => setMonthlySaving(val)}/>
      </div>
    </div>
  );
}

export default SavingsAccount;