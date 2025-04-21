import { setGlobals } from './globals';
import { liquidate } from './liquidation/liquidation'
import readlineSync from 'readline-sync';

async function start() {
    await setGlobals();

    var collateralAddress = readlineSync.question('Enter collateral address: ');
    var reserveAddress = readlineSync.question('Enter reserve address: ');
    var userLiquidated = readlineSync.question('Enter liquidated user address: ');
    var purchaseAmount = readlineSync.question('Enter purchase amount: ');
    const receiveATokens = false
    
    liquidate(
        collateralAddress,
        reserveAddress,
        userLiquidated,
        purchaseAmount,
        receiveATokens
    );    
}

start();