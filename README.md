This project provides a simple interface to allow users to exchange ETH for DAI, manage their cDAI (Compound DAI) deposits, and visualize their savings if they continued to save and compound at current rates. 

## Requirements
Node v.11 is required due to dai.js. A Web3-enabled browser is also required to use this app. 
Currently, the app is configured for the Kovan testnet and is not compatible with the Ethereum Mainnet. 

## Setup
Please use nvm to configure your current node version before installing dependencies. The node version is provided in .nvmrc.
```
nvm use 
```

Then install the necessary dependencies. 
```
yarn 
```

To start the app, please use:
```
yarn start
```

Then, navigate to localhost:3000 and allow Metamask or your Web3-enabled browser to connect to the application. 