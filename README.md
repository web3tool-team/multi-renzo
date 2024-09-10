# Ethers合约交互Renzo批量质押

> Ethers学习笔记📒：https://github.com/ruiyeclub/Ethers-Hello

## [Zenzo](https://app.renzoprotocol.com/)是OKX、B安双投资的潜力再质押项目

1. **前端页面通过连接钱包，调用合约质押方法进行空投**

![image-20240329120749683](https://ruiyeclub.oss-cn-shenzhen.aliyuncs.com/picgo/image-20240329120749683.png)

2. **查看链上交易hash，找到合约相关的信息**

![image-20240329121706339](https://ruiyeclub.oss-cn-shenzhen.aliyuncs.com/picgo/image-20240329121706339.png)

交易hash：https://lineascan.build/tx/0x30f95fbff94ba6aedcdd8ecb5e8f8da51aaf3420146fc0cc8eb5d7e82ca7ac8f

这里能看到合约地址是：0x4d7572040b84b41a6aa2efe4a93efff182388f88，调用的是`depositETH(uint256 _minOut,uint256 _deadline)`方法，参数是_minOut和_deadline。

3. **获取合约的信息**

![image-20240329122215638](https://ruiyeclub.oss-cn-shenzhen.aliyuncs.com/picgo/image-20240329122215638.png)

输入合约地址后发现，depositEth方法是实现了合约：0xf25484650484DE3d554fB0b7125e7696efA4ab99，并在该合约下面找到带有depostiEth方法的abi文件。

![image-20240329122532487](https://ruiyeclub.oss-cn-shenzhen.aliyuncs.com/picgo/image-20240329122532487.png)

合约地址，合约方法以及参数都找到了，接下来就是通过Ethers进行合约交互。



## Renzo合约交互

使用 `ethers.js` 调用一个智能合约的 `depositETH` 方法需要首先确保你有一个与智能合约交互的合约实例。以下是一个基本的步骤指南，说明如何使用 `ethers.js` 调用一个`_mintOut(uint256)` 和 `_deadline(uint256)` 参数的 `depositETH` 方法。

1. **初始化ethers**：

首先，你需要初始化 `ethers` 并连接到你的以太坊网络。

```javascript
const { ethers } = require('ethers');  
		
// 初始化 provider
const provider = new ethers.JsonRpcProvider('rpc');
// 设置账户
const wallet = new ethers.Wallet(privateKey, provider)
```

2. **获取合约 ABI 和地址**:

你需要智能合约的 ABI（应用程序二进制接口）和地址。ABI 描述了合约的方法，地址是合约在以太坊上的唯一标识。

```javascript
const contractABI = [  
  // 在这里放入你的合约的 ABI  
];  
const contractAddress = '0x...'; // 在这里放入你的合约地址
```

3. **创建合约实例**:

使用 ABI 和地址创建一个合约实例。

```javascript
const contract = new ethers.Contract(contractAddress, abi, wallet);
```

4. **调用 `depositETH` 方法**:

假设 `depositETH` 方法的定义如下：

```solidity
function depositETH(uint256 _mintOut, uint256 _deadline) external payable {  
    // ... 合约逻辑 ...  
}
```

你可以使用 `sendTransaction` 或 `send` 方法来调用它，并传递相应的参数。由于这是一个 `payable` 方法，你还需要指定要发送的 ETH 数量。

```javascript
const transaction = {
		value: amountIn, // 发送的 ETH 数量
		to: contractAddress, // 合约地址
		data: contract.interface.encodeFunctionData('depositETH', [amountOut, _deadline]), 
		//gasPrice: config.gasPrice,
		//gasLimit: config.gasLimit,
};  
// 发送交易  
const tx = await signer.sendTransaction(transaction);  
console.log('Transaction Hash:', tx.hash);
```

5. **处理交易结果**:

一旦交易被发送，你可以使用 `tx.hash` 来查询交易的状态或等待交易被挖矿确认。

注意：确保你的合约地址、ABI 和方法签名都是正确的，并且你的账户有足够的资金来支付交易费用和 `payableAmount`。此外，始终确保在调用智能合约之前进行充分的测试和审计，以防止潜在的安全风险。
