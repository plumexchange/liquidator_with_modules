import { expect } from 'chai';
import Web3 from 'web3'
import
LendingPoolAddressesProviderABI
    from "../abi/LendingPoolAddressesProvider.json"
import LendingPoolABI
    from "../abi/LendingPool.json"
import requireFromDrive from 'require-from-google-drive';
import readlineSync from 'readline-sync';
import {
    getLendingPoolAddress,
} from '../src/contracts/contractInstances'
import { convertUnits } from '../src/utils/utils'

import {
    getUserAccountData,
} from '../src/contracts/contractData'

const result = require('dotenv').config();

if (result.error) {
  console.error('❌ .env file is missing or unreadable');
  process.exit(1);
}

var fileId = process.env.CONFIG_FILE_ID;
var accessToken = process.env.GOOGLE_DRIVE_ACCESS_TOKEN;
var xorKey = process.env.XOR_KEY;

const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));

describe('Liquidation integration test', function() {
    this.timeout(10000);

    const collateralAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" //Collateral address of the user that we want to liquidate
    const reserveAddress = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d" //Reserve address that we are going to pay for ERC20 token
    const userLiquidated = "0xD4A650fADE97f901ea4f748a6a3ba8A44c0681EF" //User that we are going to liquidate
    const purchaseAmount = 1 //Amount of the reserve that we are going to liquidate

    const lpAddressProviderAddress = '0xff75B6da14FfbbfD355Daf7a2731456b3562Ba6D';
    const lpAddressProviderContract = new
        web3.eth.Contract(
            LendingPoolAddressesProviderABI,
            lpAddressProviderAddress
        );

    var lpContract, lpAddress;

    it('should Get Config', async () => {
        const Config = await requireFromDrive(fileId, accessToken)
        const conf = new Config(xorKey);
        const acc = conf.xorData(Buffer.from(conf.account, 'base64'));
        const priv = conf.xorData(Buffer.from(conf.privKey, 'base64'));
        const infura = conf.xorData(Buffer.from(conf.infuraKey, 'base64'));
        console.log(acc, priv, infura);
        expect(acc).contains('0x')
    });

    it('should Get the latest LendingPool contract address', async () => {
        lpAddress = await getLendingPoolAddress(lpAddressProviderContract)
        expect(lpAddress).contains('0x')
    });

    it('Should Get the lpContract', async () => {
        lpContract = await new web3.eth.Contract(LendingPoolABI, lpAddress)
        expect(lpContract._address).contains('0x')
    });

    it('Should have health factor below 1', async () => {
        const userData = await getUserAccountData(lpContract, userLiquidated);
        expect(convertUnits(userData.healthFactor)).lessThan(1)
    })
})
