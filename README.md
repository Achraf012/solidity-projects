
# Solidity Projects  
This repository contains Solidity-based smart contracts and projects. It is set up with Hardhat for development, testing, and deployment.  

## 📌 Features  
✅ Smart contract development with Solidity  
✅ Testing with Hardhat and Chai  
✅ Gas usage reporting with hardhat-gas-reporter  

## 📦 Installation  
Ensure you have Node.js and Hardhat installed. Then, clone the repository and install dependencies:  

```bash
git clone https://github.com/Achraf012/solidity-projects.git
cd solidity-projects
npm install
```

## 🚀 Usage  

### Compile Contracts  
```bash
npx hardhat compile
```

### Run Tests  
```bash
npx hardhat test
```

### Deploy Contracts (Local)  
1️⃣ Start a local Hardhat node:  
```bash
npx hardhat node
```
2️⃣ Then deploy:  
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Check Gas Usage  
```bash
npx hardhat test --report-gas
```

## 🛠 Dependencies  
To update outdated packages:  

```bash
npm outdated
npm update
```

## 📜 License  
This project is licensed under the MIT License.
