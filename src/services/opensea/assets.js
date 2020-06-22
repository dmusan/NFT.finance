import axios from 'axios';
import { OPENSEA_ASSETS, OPENSEA_SINGLE_ASSET, API_KEY } from "../../assets/consts/assetsConsts"

export const getAssetsOpensea = (account) => {
  try {
    const response = axios.get(OPENSEA_ASSETS, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
      },
      params: {
        order_direction: 'desc',
        offset: '0',
        owner: account,
      }
    });
    return response;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export const getAllLeaseAssets = async (leaseOffers) => {
  const leaseAssets = leaseOffers.map( (offer) =>
    getAssetRequest(offer.smartContractAddressOfNFT, offer.tokenIdNFT)
  );
  return Promise.all(
    leaseOffers.map(
      (offer) => getAssetRequest(offer.smartContractAddressOfNFT, offer.tokenIdNFT)
    )
  )
  return leaseAssets;
}

export const getAllLoanAssets = async (loanRequests) => {
  const loanAssets = loanRequests.map( (request) =>
    getAssetRequest(request.smartContractAddressOfNFT, request.tokenIdNFT)
  );
  return Promise.all(
    loanRequests.map(
      (request) => getAssetRequest(request.smartContractAddressOfNFT, request.tokenIdNFT)
    )
  )
  return loanAssets;
}

export const getAssetRequest = async (contractAddress, tokenIdNFT) => {
  try {
    const response = await axios.get(OPENSEA_SINGLE_ASSET + contractAddress + "/" + tokenIdNFT, {
      headers: {
        'X-API-KEY': API_KEY
      }});
    return response;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
