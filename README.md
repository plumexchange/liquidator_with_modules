# Aave protocol liquidation program
This project is a script designed to perform liquidations on the [Aave Protocol](https://aave.com/), leveraging direct smart contract interaction. It allows users to monitor borrower positions and execute liquidations when conditions are met.

## ⚙️ Features

- Interacts directly with Aave smart contracts (v3)
- Executes liquidations when borrower health factor drops below 1.0
- Accepts parameters for collateral and debt assets
- Supports configurable wallet and RPC settings
- Clear logging of all actions and transaction results

## 🧪 Integration test
This is an integration test, and will call external resources in ropsten network

- Create .env File

- Fill the test data

- Execute test

    `npm test`

## 🚀 Start

- Create .env File

- Execute liquidation script

    `npm start`

