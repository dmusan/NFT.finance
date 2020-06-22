import { getAllLoanRequests } from '../../services/web3/loansNFTContract'
import { getAllLoanAssets } from '../../services/opensea/assets'

export const getLoanRequestsAction = () => {
  return (dispatch, getState) => {
    getAllLoanRequests().then( loanRequests => {
        const updatedRequests = loanRequests.map( (loanRequest) => {
            loanRequest.lender = loanRequest.lender.toLowerCase();
            loanRequest.borrower = loanRequest.borrower.toLowerCase();
            loanRequest.smartContractAddressOfNFT = loanRequest.smartContractAddressOfNFT.toLowerCase();
            return loanRequest;
          }
        )
        dispatch({ type: 'ADD_LOAN_REQUESTS', loanRequests: updatedRequests })
      }
    )
  }
}

export const getLoanAssetsAction = (loanRequests) => {
  return (dispatch, getState) => {
    getAllLoanAssets(loanRequests).then( loanAssets => {
      // Extract data from API response
      const updatedAssets = loanAssets.map(loanAsset => loanAsset.data)
      dispatch({ type: 'ADD_LOAN_ASSETS', loanAssets: updatedAssets });
    })
  }
}
