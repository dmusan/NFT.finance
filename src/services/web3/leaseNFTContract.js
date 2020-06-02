import Web3 from 'web3'
import { ToastMessage } from "rimble-ui";
import contractInterface from '../../contractsInterfaces/LendNFT.json'
import erc721ContractInterface from '../../contractsInterfaces/erc721.json'

const CONTRACT_ADDRESS = '0x8693e34CDa0Dc04289399cad57822928EEc5CF6b'

// TODO move to ethHelpers
export const ethEnabled = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    return true;
  }
  return false;
}

// TODO move to ethHelpers
export const getWeb3Account = () => {
  return window.ethereum.enable().then( accounts => accounts[0].toLowerCase() );
}

export const getAllLeaseOffers = async (address) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, { from: address });
  const leaseOffersNumber = parseInt(await crt.methods.totalLendingOffers().call())
  return Promise.all(
    [...Array(leaseOffersNumber + 1).keys()].map(
      id => crt.methods.allLendingOffers(id).call()
    )
  )
}

export const approveNFT = (erc721ContractAddress, userAddress, tokenIdNFT) => {
  const web3 = new Web3(window.ethereum);
  console.log("1: " + erc721ContractAddress);
  console.log("2: " + userAddress);
  console.log("3: " + tokenIdNFT);
  const erc721crt = new web3.eth.Contract(
    erc721ContractInterface,
    erc721ContractAddress,
    {from: userAddress}
  );
  erc721crt.methods.approve(CONTRACT_ADDRESS, tokenIdNFT).send().on('transactionHash', (hash) => {
    window.toastProvider.addMessage("Transaction started...", {
      secondaryMessage: "Check progress on Etherscan",
      actionHref: "https://rinkeby.etherscan.io/tx/" + hash,
      actionText: "Check",
      variant: "processing"
    })
  }).on('receipt', (receipt) => {
    window.toastProvider.addMessage("NFT approved!", {
      secondaryMessage: "You can create a new lease offer now",
      variant: "success"
    })
    // on confirmation 5 we will refresh offers
  }).on('error', (error) => {
    window.toastProvider.addMessage("Transaction failed...", {
      secondaryMessage: "Try again",
      variant: "failure"
    })
  });
}
