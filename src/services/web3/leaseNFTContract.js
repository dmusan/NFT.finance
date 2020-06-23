import Web3 from 'web3'
import contractInterface from '../../contractsInterfaces/LendNFT.json'
import erc721ContractInterface from '../../contractsInterfaces/erc721.json'
import { LEASING_CONTRACT_ADDRESS, RINKEBY_NETWORK_VERSION } from "../../assets/consts/offersConsts"
import { processingToast, successToast, failedToast } from './toasts.js'

export const getWeb3Account = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    web3.eth.net.getId().then( id => {
        if (id !== RINKEBY_NETWORK_VERSION) {
          alert("Please switch to Rinkeby test network to use this app!");
        }
      }
    )
    return window.ethereum.enable().then( accounts => accounts[0].toLowerCase() );
  }
  alert("Install an Ethereum-compatible browser or extension running on Rinkeby test network to use this app!");
  return 0;
}

export const getAllLeaseOffers = async (address) => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    const crt = new web3.eth.Contract(contractInterface, LEASING_CONTRACT_ADDRESS, { from: address });
    const leaseOffersNumber = parseInt(await crt.methods.totalLendingOffers().call())
    return Promise.all(
      [...Array(leaseOffersNumber).keys()].map(
        id => crt.methods.allLendingOffers(id).call()
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

  // gas estimate
  erc721crt.methods.approve(LEASING_CONTRACT_ADDRESS, tokenIdNFT).estimateGas((error, gasAmount) => {
    console.log("gas estimate for approve: " + gasAmount);
  });

  erc721crt.methods.approve(LEASING_CONTRACT_ADDRESS, tokenIdNFT).send().on('transactionHash', (hash) => {
    processingToast(hash);
  }).on('receipt', (receipt) => {
    successToast("NFT has been approved!");
  }).on('error', (error) => {
    failedToast();
  });
}

export const lendNFT = async (userAddress, smartContractAddressOfNFT, token_id,
                        lendinPeriod, collateralAmount, lendingPrice) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, LEASING_CONTRACT_ADDRESS, {from: userAddress});

  const ethCollateralAmount = web3.utils.toWei(collateralAmount);
  const ethLendingPrice = web3.utils.toWei(lendingPrice);

  crt.methods.createLendingOffer(
    smartContractAddressOfNFT,
    token_id,
    ethCollateralAmount,
    ethLendingPrice,
    lendinPeriod * 86400
  ).send().on('transactionHash', (hash) => {
    processingToast(hash);
  }).on('receipt', (receipt) => {
    successToast("Offer has been created!");
  }).on('error', (error) => {
    failedToast();
  });
}

export const cancelOffer = async (lendingID, userAddress) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, LEASING_CONTRACT_ADDRESS, {from: userAddress});

  crt.methods.cancelLendingOffer(lendingID).send().on('transactionHash', (hash) => {
    processingToast(hash);
  }).on('receipt', (receipt) => {
    successToast("Offer has been cancelled!");
  }).on('error', (error) => {
    failedToast();
  });
}

export const endLendingOffer = async (lendingID, userAddress) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, LEASING_CONTRACT_ADDRESS, {from: userAddress});

  crt.methods.endLendingOffer(lendingID).send().on('transactionHash', (hash) => {
    processingToast(hash);
  }).on('receipt', (receipt) => {
    successToast("Offer has ended!");
  }).on('error', (error) => {
    failedToast();
  });
}

export const borrowNFT = async (userAddress, lendingID, collateralAmount, lendingPrice) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, LEASING_CONTRACT_ADDRESS, {from: userAddress});

  const colAm = parseFloat(web3.utils.fromWei(collateralAmount, 'ether'));
  const lenPr = parseFloat(web3.utils.fromWei(lendingPrice, 'ether'));
  const sumString = (colAm + lenPr).toString();
  const amountToBorrowETH = web3.utils.toWei(sumString);

  crt.methods.acceptLendingOffer(lendingID).send({value: amountToBorrowETH}).on('transactionHash', (hash) => {
    processingToast(hash);
  }).on('receipt', (receipt) => {
    successToast("Offer is now active!");
  }).on('error', (error) => {
    failedToast();
  });
}
