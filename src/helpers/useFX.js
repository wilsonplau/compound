import { useState, useEffect } from 'react';
import axios from 'axios';

const useFX = () => {
  const [USDJPY, setUSDJPY] = useState(0);
  useEffect(() => initializeFx(), []);

  const initializeFx = async () => {
    const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_FIXER_KEY}&symbols=USD,JPY`);
    const rates = response.data.rates;
    setUSDJPY(rates["JPY"] / rates["USD"]);
  }

  return {
    USDJPY
  }
}

export default useFX;