import { getWeb3Account } from '../../services/web3/leaseNFTContract'
import { getAssetsOpensea } from '../../services/opensea/assets'

export const getAccountAddressAction = () => {
  return (dispatch, getState) => {
    getWeb3Account().then( account =>
      dispatch({ type: 'ADD_ACCOUNT_ADDRESS', userAddress: account })
    );
  }
}

export const getAccountAssetAction = (address) => {
  return (dispatch, getState) => {
    getAssetsOpensea(address).then(response => {
        dispatch({ type: 'ADD_ACCOUNT_ASSETS', accountAssets: response.data.assets })
      }
    );
  }
}
