import axios from 'axios';
import { readFileSync } from 'fs';
import crypto from 'crypto';

// 读取配置文件
const configData = readFileSync('okx_config.json');
const config = JSON.parse(configData);

// 从文件中读取私钥
const walletsFile = 'wallets.txt';
const walletsAddress = readFileSync(walletsFile, 'utf8').split('\n').map(line => line.trim());


function signature(timestamp, method, requestPath, body, secretKey) {
  const message = timestamp + method + requestPath + body;
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(message);
  return hmac.digest('base64');
}

function getRandomNumber(min, max, fixed) {
  const rand = Math.random() * (max - min) + min;
  const power = Math.pow(10, fixed);
  return (Math.floor(rand * power) / power).toFixed(fixed);
}

async function withdrawToAllAddresses() {
  try {
    const endpoint = 'https://www.okex.com/api/v5/asset/withdrawal';
    const headers = {
      'Content-Type': 'application/json',
      'OK-ACCESS-KEY': config.apiKey,
      'OK-ACCESS-PASSPHRASE': config.passphrase
    };
    const proxy = {
      "host": "127.0.0.1",
      "port": "7890",
      "protocol": "http"
    }
    for (const wallet of walletsAddress) {
      const withdrawalParams = {
        amt: getRandomNumber(config.minWithdrawal, config.maxWithdrawal, 6),
        // amt: config.withdrawal,
        fee: config.fee,
        dest: "4",
        ccy: config.ccy,
        chain: config.chain,
        toAddr: wallet
      };
      console.log(`钱包：${wallet}，okx提币中...`)
      const timestamp = Date.now() / 1000;
      const method = 'POST';
      const requestPath = '/api/v5/asset/withdrawal';
      const body = JSON.stringify(withdrawalParams);
      headers['OK-ACCESS-TIMESTAMP'] = timestamp.toString();
      headers['OK-ACCESS-SIGN'] = signature(timestamp.toString(), method, requestPath, body, config.secretKey);

      const response = await axios.post(endpoint, withdrawalParams, { headers, proxy });
      // console.log(response)
      if (response.data.msg && response.data.msg.length > 0) {
        throw new Error(`Error : ${response.data.msg}`);
      }
      console.log(`提币成功!`);
      console.log(`Withdrawn ${withdrawalParams.amt} ${withdrawalParams.ccy} to ${withdrawalParams.toAddr} on chain ${withdrawalParams.chain}`);
      console.log(`OKX transaction ID: ${response.data.data[0].wdId}`);
      const delay = getRandomNumber(config.waitTimeMin, config.waitTimeMax, 6) * 1000;
      console.log(`✅执行完成，等待执行下一次操作...${delay / 1000}s`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  } catch (error) {
    console.log(`Withdrawal failed:`, error);
  }
}

withdrawToAllAddresses();
