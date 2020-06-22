import Web3 from 'web3'
import { ToastMessage } from "rimble-ui";
import contractInterface from '../../contractsInterfaces/LendNFT.json'
import erc721ContractInterface from '../../contractsInterfaces/erc721.json'
import { LEASING_CONTRACT_ADDRESS } from "../../assets/consts/offersConsts"

export const getWeb3Account = async () => {
  if (window.ethereum) {
    if (window.ethereum.networkVersion !== '4') {
      alert("Please switch to Rinkeby test network to use this app!");
    }
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
      [...Array(leaseOffersNumber + 1).keys()].map(
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
  }).on('error', (error) => {
    window.toastProvider.addMessage("Transaction failed...", {
      secondaryMessage: "Try again",
      variant: "failure"
    })
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
  ).send().on('confirmation', () => {
    console.log("added to blockchain")
  })
}

export const cancelOffer = async (lendingID, userAddress) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, LEASING_CONTRACT_ADDRESS, {from: userAddress});

  crt.methods.cancelLendingOffer(lendingID).send().on('confirmation', () => {
    console.log("cancelled offer")
  })
}

export const endLendingOffer = async (lendingID, userAddress) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, LEASING_CONTRACT_ADDRESS, {from: userAddress});

  crt.methods.endLendingOffer(lendingID).send().on('confirmation', () => {
    console.log("end offer")
  })
}

export const borrowNFT = async (userAddress, lendingID, collateralAmount, lendingPrice) => {
  const web3 = new Web3(window.ethereum);
  const crt = new web3.eth.Contract(contractInterface, LEASING_CONTRACT_ADDRESS, {from: userAddress});

  const colAm = parseFloat(web3.utils.fromWei(collateralAmount, 'ether'));
  const lenPr = parseFloat(web3.utils.fromWei(lendingPrice, 'ether'));
  const sumString = (colAm + lenPr).toString();
  const amountToBorrowETH = web3.utils.toWei(sumString);

  crt.methods.acceptLendingOffer(lendingID).send({value: amountToBorrowETH}).on('confirmation', () => {
    console.log("borrow offer")
  })
}
