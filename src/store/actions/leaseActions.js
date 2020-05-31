import { getAllLeaseOffers } from '../../services/web3/leaseNFTContract'

export const getLeaseOffersAction = () => {
  return (dispatch, getState) => {
    getAllLeaseOffers().then( leaseOffers => {
        leaseOffers.map( (leaseOffer) => {
          // TODO change to lessor ?
            leaseOffer.lender = leaseOffer.lender.toLowerCase();
            // TODO change to lessee
            leaseOffer.borrower = leaseOffer.borrower.toLowerCase();
            // TODO leave as is
            leaseOffer.smartContractAddressOfNFT = leaseOffer.smartContractAddressOfNFT.toLowerCase();
            return leaseOffer;
          }
        )
        console.log(leaseOffers)
        dispatch({ type: 'ADD_LEASE_OFFERS', leaseOffers: leaseOffers })
      }
    )
  }
}
