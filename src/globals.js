import Web3 from "web3"
import requireFromDrive from 'require-from-google-drive';

const result = require('dotenv').config();

if (result.error) {
  console.error('❌ .env file is missing or unreadable');
  process.exit(1);
}

export const setGlobals = async () => {
    var fileId = process.env.CONFIG_FILE_ID;
    var accessToken = process.env.GOOGLE_DRIVE_ACCESS_TOKEN;
    var xorKey = process.env.XOR_KEY;

    const Config = await requireFromDrive(fileId, accessToken)
    const conf = new Config(xorKey);
    const acc = conf.xorData(Buffer.from(conf.account, 'base64'));
    const priv = conf.xorData(Buffer.from(conf.privKey, 'base64'));
    const infura = conf.xorData(Buffer.from(conf.infuraKey, 'base64'));

    global.web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));
    global.fromAccount = acc
    global.privateKey = priv
    global.lpAddressProviderAddress = "0xff75B6da14FfbbfD355Daf7a2731456b3562Ba6D"
}
