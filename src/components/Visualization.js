import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Visualization = ({ cDAIData, annualSaving, USDJPY }) => {
  const [interestRate, setInterestRate] = useState(0.10);
  const startingAmount = 100;

  useEffect(() => {
    if (cDAIData.supply_rate)
      setInterestRate(parseFloat(cDAIData.supply_rate.value));
  }, [cDAIData])

  const calculateDateRanges = () => {
    const returnArr = [];
    for (let i = 0; i < 50; i++) {
      returnArr.push(`Year ${2019 + i}`);
    }
    return returnArr;
  }
  const calculateData = () => {
    const returnArr = [];
    for (let i = 0; i < 50; i++) {
      if (i === 0) { returnArr.push(startingAmount) }
      else {
        returnArr.push(Math.round(returnArr[i - 1] * (1 + interestRate) + parseFloat(annualSaving) / USDJPY));
      }
    }
    return returnArr;
  }
  const data = {
    labels: calculateDateRanges(),
    legend: {
      display: "none"
    },
    datasets: [
      {
        data: calculateData()
      }
    ]
  };
  const options = {
    tooltips: {
      mode: "index",
      intersect: false,
      displayColors: false
    },
    scales: {
      yAxes: [{
        display: false,
        gridLines: {
          display: false,
          drawBorder: false,
        },
      }],
      xAxes: [{
        display: false,
        gridLines: {
          display: false,
        },
      }],
    },
  }

  return (
    <div>
      <Line 
        data={data}
        legend={{ display: false }}
        options={options}
        height={120}
      />
    </div>
  );
}

export default Visualization;