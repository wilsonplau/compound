import React, { useState, useEffect } from 'react';
import daiIcon from '../images/dai.svg'
import enterIcon from '../images/enter.svg'
import '../styles/Deposit.scss'

const Deposit = ({ annualSaving, USDJPY }) => {
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositPeriod, setDepositPeriod] = useState("daily");

  useEffect(() => {
    if (depositPeriod === "daily") {
      setDepositAmount((annualSaving/(365*USDJPY)).toFixed(0) );
    } else if (depositPeriod === "monthly") {
      setDepositAmount((annualSaving/(12*USDJPY)).toFixed(0) );
    } else {
      setDepositAmount((annualSaving/USDJPY).toFixed(0));
    }  
  }, [annualSaving, USDJPY, depositPeriod])

  return (
    <div className="deposit">
      <div className="deposit__top">
        <small>DEPOSIT</small>
        <div className="deposit__toggle">
          <button className="deposit__toggleButton" aria-pressed={depositPeriod === "daily"} onClick={()=>setDepositPeriod("daily")}>Daily</button>
          <button className="deposit__toggleButton" aria-pressed={depositPeriod === "monthly"} onClick={()=>setDepositPeriod("monthly")}>Monthly</button>
          <button className="deposit__toggleButton" aria-pressed={depositPeriod === "yearly"} onClick={()=>setDepositPeriod("yearly")}>Yearly</button>
        </div>
      </div>
      <div className="deposit__bottom">
        <img src={daiIcon} />
        <input type="text" value={depositAmount} />
        <span>( ~¥{ (depositAmount * USDJPY).toFixed(0) })</span>
        <button><img src={enterIcon} /></button>
      </div>
    </div>
  )
}

export default Deposit;