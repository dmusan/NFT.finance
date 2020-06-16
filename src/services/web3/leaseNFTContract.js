import Web3 from 'web3'
import { ToastMessage } from "rimble-ui";
import contractInterface from '../../contractsInterfaces/LendNFT.json'
import erc721ContractInterface from '../../contractsInterfaces/erc721.json'

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
  // TODO chekc if ETH enabled
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
  const erc721crt = new web3.eth.Contract(
    erc721ContractInterface,
    erc721ContractAddress,
    {from: userAddress}
  );

// TODO remove
  erc721crt.methods.approve(CONTRACT_ADDRESS, tokenIdNFT).estimateGas((error, gasAmount) => {
    console.log("gas estimate for approve: " + gasAmount);
  });
//

  erc721crt.methods.approve(CONTRACT_ADDRESS, tokenIdNFT).send().on('transactionHash', (hash) => {
    window.toastProvider.addMessage("Transaction started...", {
      // TODO make functions for this
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

export const lendNFT = (userAddress, smartContractAddressOfNFT, token_id,
                        lendinPeriod, collateralAmount, lendingPrice) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, {from: userAddress});

  const ethCollateralAmount = web3.utils.toWei(collateralAmount);
  const ethLendingPrice = web3.utils.toWei(lendingPrice);

  // TODO remove
  crt.methods.createLendingOffer(smartContractAddressOfNFT,
      token_id,
      ethCollateralAmount,
      ethLendingPrice,
      lendinPeriod * 86400
    ).estimateGas((error, gasAmount) => {
    console.log("gas estimate for createLendingOffer: " + JSON.stringify(gasAmount));
  });
  //

  crt.methods.createLendingOffer(
    smartContractAddressOfNFT,
    token_id,
    ethCollateralAmount,
    ethLendingPrice,
    // TODO add to consts
    lendinPeriod * 86400
  ).send().on('confirmation', () => {
    console.log("added to blockchain")
  })
}

export const cancelOffer = (lendingID, userAddress) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, {from: userAddress});

  // TODO remove
  crt.methods.cancelLendingOffer(lendingID).estimateGas((error, gasAmount) => {
    console.log("gas estimate for cancelLendingOffer: " + JSON.stringify(gasAmount));
  });
  //


  crt.methods.cancelLendingOffer(lendingID).send().on('confirmation', () => {
    console.log("cancelled offer")
  })
}

export const endLendingOffer = (lendingID, userAddress) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, {from: userAddress});

  // TODO remove
  crt.methods.endLendingOffer(lendingID).estimateGas((error, gasAmount) => {
    console.log("gas estimate for endLendingOffer: " + JSON.stringify(gasAmount));
  });
  //


  crt.methods.endLendingOffer(lendingID).send().on('confirmation', () => {
    console.log("end offer")
  })
}

export const borrowNFT = (userAddress, lendingID, collateralAmount, lendingPrice) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, CONTRACT_ADDRESS, {from: userAddress});

  // add big number OPs
  const colAm = parseFloat(web3.utils.fromWei(collateralAmount, 'ether'));
  const lenPr = parseFloat(web3.utils.fromWei(lendingPrice, 'ether'));
  const sumString = (colAm + lenPr).toString();
  const amountToBorrowETH = web3.utils.toWei(sumString);

  // TODO remove
  crt.methods.acceptLendingOffer(lendingID).estimateGas({value : amountToBorrowETH}, (error, gasAmount) => {
    console.log("error for acceptLendingOffer: " + JSON.stringify(error));
    console.log("gas estimate for acceptLendingOffer: " + JSON.stringify(gasAmount));
  });
  //

  crt.methods.acceptLendingOffer(lendingID).send({value: amountToBorrowETH}).on('confirmation', () => {
    console.log("borrow offer")
  })
}
