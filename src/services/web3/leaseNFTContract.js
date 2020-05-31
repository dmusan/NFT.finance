import Web3 from 'web3'
import contractInterface from '../../contractsInterfaces/LendNFT.json'

const CONTRACT_ADDRESS = '0x8693e34CDa0Dc04289399cad57822928EEc5CF6b'

export const ethEnabled = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    return true;
  }
  return false;
}

export const getWeb3Account = () => {
  return window.ethereum.enable().then( accounts => accounts[0].toLowerCase() );
}

export const getAllLeaseOffers = async (address) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, { from: address });
  const leaseOffersNumber = parseInt(await crt.methods.totalLendingOffers().call())
  return Promise.all([...Array(leaseOffersNumber + 1).keys()].map(
    id => crt.methods.allLendingOffers(id).call()
  ))
}
