import { getAllLeaseOffers } from '../../services/web3/leaseNFTContract'
import { getAllLeaseAssets } from '../../services/opensea/assets'

export const getLeaseOffersAction = () => {
  return (dispatch, getState) => {
    getAllLeaseOffers().then( leaseOffers => {
        // Change all addresses to lowercase 
        const updatedOffers = leaseOffers.map( (leaseOffer) => {
          // TODO change to lessor ?
            leaseOffer.lender = leaseOffer.lender.toLowerCase();
            // TODO change to lessee
            leaseOffer.borrower = leaseOffer.borrower.toLowerCase();
            // TODO leave as is
            leaseOffer.smartContractAddressOfNFT = leaseOffer.smartContractAddressOfNFT.toLowerCase();
            return leaseOffer;
          }
        )
        dispatch({ type: 'ADD_LEASE_OFFERS', leaseOffers: updatedOffers })
      }
    )
  }
}

export const getLeaseAssetsAction = (leaseOffers) => {
  return (dispatch, getState) => {
    getAllLeaseAssets(leaseOffers).then( leaseAssets => {
      // Extract data from API response
      const updatedAssets = leaseAssets.map(leaseAsset => leaseAsset.data)
      dispatch({ type: 'ADD_LEASE_ASSETS', leaseAssets: updatedAssets });
    })
  }
}
