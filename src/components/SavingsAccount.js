import React from 'react';
import Slider from 'rc-slider';
import '../styles/SavingsAccount.scss';
import 'rc-slider/assets/index.css';
import daiIcon from '../images/dai.svg'

const SavingsAccount = ({ cDaiBalance, cDaiData, USDJPY, annualSaving, setAnnualSaving }) => {

  return (
    <div className="savingsAccount">
      <small>YOUR SAVINGS ACCOUNT</small>
      <h1><img src={daiIcon} />{ cDaiBalance } <span>(¥{ (cDaiBalance * USDJPY).toFixed(0) })</span> </h1>
      <h2><strong>Current interest rate:</strong> { cDaiData.supply_rate && `${(cDaiData.supply_rate.value * 100).toFixed(2)}%` }</h2>
      {/* <h2><strong>Interest earned to date:</strong> { cDaiBalance && (cDaiBalance - 180).toFixed(2) }</h2> */}

      <div className="savingsAccount__slider">
        <h2><strong>How much do you want to save per year?</strong> ¥{annualSaving.toLocaleString()}</h2>
        <Slider min={0} max={10000000} step={10000} value={annualSaving} onChange={(val) => setAnnualSaving(val)}/>
      </div>
    </div>
  );
}

export default SavingsAccount;