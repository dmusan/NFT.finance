import axios from 'axios';
import Web3 from 'web3'

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

export const getAccountAddress = () => {
  return (dispatch, getState) => {
    window.ethereum.enable().then( accounts =>
      dispatch({ type: 'ADD_ACCOUNT_ADDRESS', userAddress: accounts[0].toLowerCase() })
    );
  }
}

export const getAccountAssetAction = (address) => {
  return (dispatch, getState) => {
    console.log("state is: " + address);
    getAssetsOpensea(address).then(response => {
        console.log("response is: " + JSON.stringify(response.data.assets));
        dispatch({ type: 'ADD_ACCOUNT_ASSETS', accountAssets: response.data.assets })
      }
    );
  }
}
