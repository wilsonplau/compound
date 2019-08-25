import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import '../styles/Visualization.scss'

const Visualization = ({ cDaiData, annualSaving, USDJPY }) => {
  const [interestRate, setInterestRate] = useState(0.10);
  const startingAmount = 100;

  useEffect(() => {
    if (cDaiData.supply_rate)
      setInterestRate(parseFloat(cDaiData.supply_rate.value));
  }, [cDaiData])

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
        data: calculateData(),
        backgroundColor: "#FFFFF0",
        borderColor: "#ECC94B"
      }
    ]
  };
  const options = {
    tooltips: {
      mode: "index",
      intersect: false,
      displayColors: false,
      callbacks: {
        label: (tooltipItem) => `${parseInt(tooltipItem.value).toLocaleString("en")}`
      }
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