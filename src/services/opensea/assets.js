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
  // TODO delete???
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

// TODO make use prev function
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
    const response = await axios.get("https://rinkeby-api.opensea.io/api/v1/asset/" + contractAddress + "/" + tokenIdNFT, {
      headers: {
        'X-API-KEY': '4e9ca01b6f0c403d9c5110b9c89b177a'
      }});
    return response;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
