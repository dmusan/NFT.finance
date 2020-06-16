import Web3 from 'web3'
import { ToastMessage } from "rimble-ui";
import contractInterface from '../../contractsInterfaces/LoansNFT.json'
import erc721ContractInterface from '../../contractsInterfaces/erc721.json'

const CONTRACT_ADDRESS = '0x83daF7a1442791c763B129cd624a0C98B17ba47a'

export const getAllLoanRequests = async (address) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, { from: address });
  const loanRequestsNumber = parseInt(await crt.methods.totalLoanRequests().call())
  return Promise.all(
    [...Array(loanRequestsNumber + 1).keys()].map(
      id => crt.methods.allLoanRequests(id).call()
    )
  )
}

export const approveNFT = (erc721ContractAddress, userAddress, tokenIdNFT) => {
  const web3 = new Web3(window.ethereum);
  const erc721crt = new web3.eth.Contract(
    erc721ContractInterface,
    erc721ContractAddress,
    {from: userAddress}
  );
  erc721crt.methods.approve(CONTRACT_ADDRESS, tokenIdNFT).send().on('transactionHash', (hash) => {
  }).on('receipt', (receipt) => {}).on('error', (error) => {});
}

export const createLoanRequest = (userAddress, smartContractAddressOfNFT, tokenIdNFT,
                        loanAmount, interestAmount, singlePeriodTime, maximumInterestPeriods) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, {from: userAddress});

  const ethLoanAmount = web3.utils.toWei(loanAmount);
  const ethInterestAmount = web3.utils.toWei(interestAmount);

  // TODO remove
  crt.methods.createLoanRequest(
    smartContractAddressOfNFT,
    tokenIdNFT,
    ethLoanAmount,
    ethInterestAmount,
    singlePeriodTime * 86400,
    maximumInterestPeriods
  ).estimateGas((error, gasAmount) => {
    console.log("gas estimate for createLoanRequest: " + JSON.stringify(gasAmount));
  });
  //



  crt.methods.createLoanRequest(
    smartContractAddressOfNFT,
    tokenIdNFT,
    ethLoanAmount,
    ethInterestAmount,
    singlePeriodTime * 86400,
    maximumInterestPeriods
  ).send().on('confirmation', () => {
    console.log("added to blockchain")
  })
}

// TODO
export const cancelLoanRequest = (userAddress, loanID) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, {from: userAddress});

  // TODO remove
  crt.methods.cancelLoanRequest(loanID).estimateGas((error, gasAmount) => {
    console.log("gas estimate for cancelLoanRequest: " + JSON.stringify(gasAmount));
  });
  //


  crt.methods.cancelLoanRequest(loanID).send().on('confirmation', () => {
    console.log("cancelled loan")
  })
}

export const endLoanRequest = (userAddress, loanID, loanAmount) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, {from: userAddress});

  // TODO remove
  crt.methods.endLoanRequest(loanID).estimateGas({value: loanAmount}, (error, gasAmount) => {
    console.log("gas estimate for endLoanRequest: " + JSON.stringify(gasAmount));
  });
  //


  crt.methods.endLoanRequest(loanID).send({value: loanAmount}).on('confirmation', () => {
    console.log("cancelled loan")
  })
}

export const extendLoanRequest = (userAddress, loanID, interestAmount) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, {from: userAddress});

  // TODO remove
  crt.methods.extendLoanRequest(loanID).estimateGas({value: interestAmount}, (error, gasAmount) => {
    console.log("gas estimate for extendLoanRequest: " + JSON.stringify(gasAmount));
  });
  //


  crt.methods.extendLoanRequest(loanID).send({value: interestAmount}).on('confirmation', () => {
    console.log("cancelled loan")
  })
}


// TODO
export const acceptLoanRequest = (userAddress, loanID, loanAmount, interestAmount) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, {from: userAddress});
  // add big number OPs
  const ethLoanAmount = parseFloat(web3.utils.fromWei(loanAmount, 'ether'));
  const ethInterestAmount = parseFloat(web3.utils.fromWei(interestAmount, 'ether'));
  const sumString = (ethLoanAmount - ethInterestAmount).toString();
  const loanTotal = web3.utils.toWei(sumString);

  // TODO remove
  crt.methods.acceptLoanRequest(loanID).estimateGas({value: loanTotal}, (error, gasAmount) => {
    console.log("gas estimate for acceptLoanRequest: " + JSON.stringify(gasAmount));
  });
  //


  crt.methods.acceptLoanRequest(loanID).send({value: loanTotal}).on('confirmation', () => {
    console.log("loan active")
  })
}
