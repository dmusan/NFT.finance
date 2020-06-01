import axios from 'axios';

export const getAssetsOpensea = (account) => {
  try {
    const response = axios.get('https://rinkeby-api.opensea.io/api/v1/assets/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
  const leaseAssets =  leaseOffers.map( (offer) =>
    getAssetRequest(offer.smartContractAddressOfNFT, offer.tokenIdNFT)
  );
  return Promise.all(
    leaseOffers.map(
      (offer) => getAssetRequest(offer.smartContractAddressOfNFT, offer.tokenIdNFT)
    )
  )
  return leaseAssets;
}

export const getAssetRequest = async (contractAddress, tokenIdNFT) => {
  try {
    const response = axios.get("https://rinkeby-api.opensea.io/api/v1/asset/" + contractAddress + "/" + tokenIdNFT);
    return response;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
