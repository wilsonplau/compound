import React from 'react';
import { Line } from 'react-chartjs-2';

const Visualization = () => {

  const calculateDateRanges = () => {
    const returnArr = [];
    for (let i = 0; i < 50; i++) {
      returnArr.push(2019 + i);
    }
    return returnArr;
  }
  const calculateData = () => {
    const returnArr = [];
    for (let i = 0; i < 50; i++) {
      returnArr.push((100 * Math.pow(1.10, i)).toFixed(2));
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
      mode: 'index',
      axis: 'y'
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