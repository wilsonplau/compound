import React, { useState } from 'react';
import daiIcon from '../images/dai.svg'
import ethIcon from '../images/eth.svg'
import '../styles/Exchange.scss'

const Exchange = ({ maker }) => {
  const [amount, setAmount] = useState(0);
  const [exchangeState, setExchangeState] = useState("buy");
  
  const buyDai = async() => {
    await maker.authenticate();
    const response = await maker.service('exchange').buy('DAI', 'ETH', amount);
  }

  const buyEth = async() => {
    await maker.authenticate();
    const response = await maker.service('exchange').buy('ETH', 'DAI', amount);
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
            <img src={ethIcon} /> > <img src={daiIcon} />
          </button>
          <button className="exchange__toggleButton" aria-pressed={exchangeState === "sell"} onClick={() => setExchangeState("sell")}>
            <img src={daiIcon} /> > <img src={ethIcon} />
          </button>
        </div>        
      </div>

      <div className="exchange__bottom">
        { exchangeState === "buy" ? <img src={daiIcon} /> : <img src={ethIcon} /> }
        <input type="text" value={amount} onChange={(e)=>handleInput(e)}/>
        <button>Confirm</button>
      </div>
    </div>
  )
}

export default Exchange; 