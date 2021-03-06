import React, { useState } from 'react';
import daiIcon from '../images/dai.svg'
import ethIcon from '../images/eth.svg'
import enterIcon from '../images/enter.svg'
import '../styles/Exchange.scss'

const Exchange = ({ maker, refreshBalances }) => {
  const [amount, setAmount] = useState(0);
  const [exchangeState, setExchangeState] = useState("buy");
  
  const buyDai = async() => {
    await maker.authenticate();
    await maker.service('exchange').buy('DAI', 'ETH', amount);
    refreshBalances();
  }

  const buyEth = async() => {
    await maker.authenticate();
    await maker.service('exchange').buy('ETH', 'DAI', amount);
    refreshBalances();
  }

  const handleInput = (e) => {  
    if (!isNaN(e.target.value))
      setAmount(e.target.value);
  }

  return (
    <div className="exchange">

      <div className="exchange__top">
        <small>EXCHANGE</small>
        <div className="exchange__toggle">
          <button className="exchange__toggleButton" aria-pressed={exchangeState === "buy"} onClick={() => setExchangeState("buy")}>
            <img src={ethIcon} alt="ETH" /> > <img src={daiIcon} alt="DAI" />
          </button>
          <button className="exchange__toggleButton" aria-pressed={exchangeState === "sell"} onClick={() => setExchangeState("sell")}>
            <img src={daiIcon} alt="DAI" /> > <img src={ethIcon} alt="ETH" />
          </button>
        </div>        
      </div>

      <div className="exchange__bottom">
        { exchangeState === "buy" ? <img src={daiIcon} alt="DAI" /> : <img src={ethIcon} alt="ETH" /> }
        <input type="text" value={amount} onChange={(e)=>handleInput(e)}/>
        <button onClick={exchangeState === "buy" ? buyDai : buyEth }><img src={enterIcon} alt="enter" /></button>
      </div>
    </div>
  )
}

export default Exchange; 