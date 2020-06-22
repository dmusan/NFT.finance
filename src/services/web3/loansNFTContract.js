import Web3 from 'web3'
import contractInterface from '../../contractsInterfaces/LoansNFT.json'
import erc721ContractInterface from '../../contractsInterfaces/erc721.json'
import { LENDING_CONTRACT_ADDRESS } from "../../assets/consts/requestsConsts"
import { processingToast, successToast, failedToast } from './toasts.js'

export const getAllLoanRequests = async (address) => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    const crt = new web3.eth.Contract(contractInterface, LENDING_CONTRACT_ADDRESS, { from: address });
    const loanRequestsNumber = parseInt(await crt.methods.totalLoanRequests().call())
    return Promise.all(
      [...Array(loanRequestsNumber).keys()].map(
        id => crt.methods.allLoanRequests(id).call()
      )
    )
  }
  return [];
}

export const approveNFT = async (erc721ContractAddress, userAddress, tokenIdNFT) => {
  const web3 = new Web3(window.ethereum);
  const erc721crt = new web3.eth.Contract(
    erc721ContractInterface,
    erc721ContractAddress,
    {from: userAddress}
  );
  erc721crt.methods.approve(LENDING_CONTRACT_ADDRESS, tokenIdNFT).send().on('transactionHash', (hash) => {
    processingToast(hash);
  }).on('receipt', (receipt) => {
    successToast("NFT has been approved!");
  }).on('error', (error) => {
    failedToast();
  });
}

export const createLoanRequest = async (userAddress, smartContractAddressOfNFT, tokenIdNFT,
                        loanAmount, interestAmount, singlePeriodTime, maximumInterestPeriods) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, LENDING_CONTRACT_ADDRESS, {from: userAddress});

  const ethLoanAmount = web3.utils.toWei(loanAmount);
  const ethInterestAmount = web3.utils.toWei(interestAmount);

  crt.methods.createLoanRequest(
    smartContractAddressOfNFT,
    tokenIdNFT,
    ethLoanAmount,
    ethInterestAmount,
    singlePeriodTime * 86400,
    maximumInterestPeriods
  ).send().on('transactionHash', (hash) => {
    processingToast(hash);
  }).on('receipt', (receipt) => {
    successToast("Request has been created!");
  }).on('error', (error) => {
    failedToast();
  });
}

export const cancelLoanRequest = async (userAddress, loanID) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, LENDING_CONTRACT_ADDRESS, {from: userAddress});

  crt.methods.cancelLoanRequest(loanID).send().on('transactionHash', (hash) => {
    processingToast(hash);
  }).on('receipt', (receipt) => {
    successToast("Request has been cancelled!");
  }).on('error', (error) => {
    failedToast();
  });
}

export const endLoanRequest = async (userAddress, loanID, loanAmount) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, LENDING_CONTRACT_ADDRESS, {from: userAddress});

  crt.methods.endLoanRequest(loanID).send({value: loanAmount}).on('transactionHash', (hash) => {
    processingToast(hash);
  }).on('receipt', (receipt) => {
    successToast("Request has ended!");
  }).on('error', (error) => {
    failedToast();
  });
}

export const extendLoanRequest = async (userAddress, loanID, interestAmount) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, LENDING_CONTRACT_ADDRESS, {from: userAddress});

  crt.methods.extendLoanRequest(loanID).send({value: interestAmount}).on('transactionHash', (hash) => {
    processingToast(hash);
  }).on('receipt', (receipt) => {
    successToast("Request has been extended!");
  }).on('error', (error) => {
    failedToast();
  });
}


export const acceptLoanRequest = async (userAddress, loanID, loanAmount, interestAmount) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, LENDING_CONTRACT_ADDRESS, {from: userAddress});
  const ethLoanAmount = parseFloat(web3.utils.fromWei(loanAmount, 'ether'));
  const ethInterestAmount = parseFloat(web3.utils.fromWei(interestAmount, 'ether'));
  const sumString = (ethLoanAmount - ethInterestAmount).toString();
  const loanTotal = web3.utils.toWei(sumString);

  crt.methods.acceptLoanRequest(loanID).send({value: loanTotal}).on('transactionHash', (hash) => {
    processingToast(hash);
  }).on('receipt', (receipt) => {
    successToast("Request has been accepted!");
  }).on('error', (error) => {
    failedToast();
  });
}
