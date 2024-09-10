import { readFileSync } from 'fs';
import { ethers } from "ethers";

async function callDeposit(privateKey) {
    // 读取配置文件
    const configData = readFileSync('config.json');
    const config = JSON.parse(configData);
    // 节点
    let url = '';
    // 合约地址
    let contractAddress = '';
    // fee
    let feeRate = 0;
    const chainName = config.chainName;
    if (chainName === "linea") {
        url = 'https://linea-mainnet.infura.io/v3/节点';
        contractAddress = '0x4d7572040b84b41a6aa2efe4a93efff182388f88';
        feeRate = 0.987;
    } else if (chainName === "arb") {
        url = 'https://arbitrum-mainnet.infura.io/v3/节点';
        contractAddress = '0xf25484650484DE3d554fB0b7125e7696efA4ab99';
        feeRate = 0.988;
    } else {
        throw new Error("请在配置文件输入chainName,目前支持arb和linea");
    }
    console.log(`当前是：${chainName}链`)
    // 初始化 provider
    const provider = new ethers.JsonRpcProvider(url);
    const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "InsufficientOutputAmount", "type": "error" }, { "inputs": [], "name": "InvalidOraclePrice", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "expectedSender", "type": "address" }, { "internalType": "address", "name": "actualSender", "type": "address" }], "name": "InvalidSender", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "InvalidTimestamp", "type": "error" }, { "inputs": [{ "internalType": "uint8", "name": "expected", "type": "uint8" }, { "internalType": "uint8", "name": "actual", "type": "uint8" }], "name": "InvalidTokenDecimals", "type": "error" }, { "inputs": [], "name": "InvalidZeroInput", "type": "error" }, { "inputs": [], "name": "InvalidZeroOutput", "type": "error" }, { "inputs": [], "name": "OraclePriceExpired", "type": "error" }, { "inputs": [], "name": "PriceFeedNotAvailable", "type": "error" }, { "inputs": [], "name": "UnauthorizedBridgeSweeper", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sweeper", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "allowed", "type": "bool" }], "name": "BridgeSweeperAddressUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint32", "name": "destinationDomain", "type": "uint32" }, { "indexed": false, "internalType": "address", "name": "destinationTarget", "type": "address" }, { "indexed": false, "internalType": "address", "name": "delegate", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "BridgeSwept", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint8", "name": "version", "type": "uint8" }], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "newOracle", "type": "address" }, { "indexed": false, "internalType": "address", "name": "oldOracle", "type": "address" }], "name": "OraclePriceFeedUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "PriceUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "newReceiver", "type": "address" }, { "indexed": false, "internalType": "address", "name": "oldReceiver", "type": "address" }], "name": "ReceiverPriceFeedUpdated", "type": "event" }, { "inputs": [], "name": "EXPECTED_DECIMALS", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "allowedBridgeSweepers", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "bridgeDestinationDomain", "outputs": [{ "internalType": "uint32", "name": "", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "bridgeRouterFeeBps", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "bridgeTargetAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "collateralToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "connext", "outputs": [{ "internalType": "contract IConnext", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "_minOut", "type": "uint256" }, { "internalType": "uint256", "name": "_deadline", "type": "uint256" }], "name": "deposit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_minOut", "type": "uint256" }, { "internalType": "uint256", "name": "_deadline", "type": "uint256" }], "name": "depositETH", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "depositToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMintRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_currentPrice", "type": "uint256" }, { "internalType": "contract IERC20", "name": "_xezETH", "type": "address" }, { "internalType": "contract IERC20", "name": "_depositToken", "type": "address" }, { "internalType": "contract IERC20", "name": "_collateralToken", "type": "address" }, { "internalType": "contract IConnext", "name": "_connext", "type": "address" }, { "internalType": "bytes32", "name": "_swapKey", "type": "bytes32" }, { "internalType": "address", "name": "_receiver", "type": "address" }, { "internalType": "uint32", "name": "_bridgeDestinationDomain", "type": "uint32" }, { "internalType": "address", "name": "_bridgeTargetAddress", "type": "address" }, { "internalType": "contract IRenzoOracleL2", "name": "_oracle", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "lastPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastPriceTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "oracle", "outputs": [{ "internalType": "contract IRenzoOracleL2", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "receiver", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "address", "name": "_to", "type": "address" }], "name": "recoverERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "address", "name": "_to", "type": "address" }], "name": "recoverNative", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_sweeper", "type": "address" }, { "internalType": "bool", "name": "_allowed", "type": "bool" }], "name": "setAllowedBridgeSweeper", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IRenzoOracleL2", "name": "_oracle", "type": "address" }], "name": "setOraclePriceFeed", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_receiver", "type": "address" }], "name": "setReceiverPriceFeed", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "swapKey", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sweep", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_price", "type": "uint256" }, { "internalType": "uint256", "name": "_timestamp", "type": "uint256" }], "name": "updatePrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "updatePriceByOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "xezETH", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }]
    // 设置账户
    const wallet = new ethers.Wallet(privateKey, provider)
    // console.log(wallet.address)
    // 连接合约
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    // 合约参数
    const randomBetween = getRandomBetween(config.amountMin, config.amountMax);
    const randomOut = String((randomBetween * feeRate).toFixed(5));
    let amountIn = ethers.parseEther(String(randomBetween))
    let amountOut = ethers.parseEther(randomOut)
    const _deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20分钟后的截止时间
    console.log('当前质押数量：', randomBetween, '，质押返回数量：', randomOut)
    const transaction = {
        value: amountIn, // 发送的 ETH 数量
        to: contractAddress, // 合约地址
        data: contract.interface.encodeFunctionData('depositETH', [amountOut, _deadline]), // 编码的函数数据
        gasPrice: config.gasPrice, // Can set this >= to the number read from Ganache window
        gasLimit: config.gasLimit, // Use the same gasLimit as read from Ganache window (or a bit higher if still having issue)
    };
    // console.log(await contract.lastPrice())
    // console.log(config)
    // console.log(transaction)
    // 发送交易
    const tx = await wallet.sendTransaction(transaction);
    console.log('✅Transaction Hash:', tx.hash);
    console.log('✅该钱包地址已经完成质押: ', wallet.address)
    // 等待
    const generateTime = generateRandomInt(config.waitTimeMin, config.waitTimeMax);
    console.log('等待结束，执行操作...', generateTime, "s");
    // 等待
    await new Promise(resolve => setTimeout(resolve, 1000 * generateTime));
}

function getRandomBetween(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(3));
}

function generateRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // 含最大值，含最小值
}

async function main() {
    // 从文件中读取私钥
    const privateKeyFile = 'privateKeys.txt';
    const privateKeys = readFileSync(privateKeyFile, 'utf8').split('\n').map(line => line.trim());

    // 逐行调用方法
    for (const privateKey of privateKeys) {
        await callDeposit(privateKey);
    }
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
