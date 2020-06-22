const initState = {
  loanRequests: [],
  loanAssets: []
}

const loanReducer = (state = initState, action) => {
  if (action.type === 'ADD_LOAN_REQUESTS') {
    let newLoanRequests = action.loanRequests;
    return {
      loanRequests: newLoanRequests,
      loanAssets: state.loanAssets
    }
  } else if (action.type === 'ADD_LOAN_ASSETS') {
    let refreshedLoanAssets = action.loanAssets;
    return {
      loanRequests: state.loanRequests,
      loanAssets: refreshedLoanAssets
    }
  }
  return state;
}

export default loanReducer;
