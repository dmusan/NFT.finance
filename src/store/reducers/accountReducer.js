const initState = {
  accountAddress: {"address": ""},
  accountAssets: []
}

const accountReducer = (state = initState, action) => {
  if (action.type === 'ADD_ACCOUNT_ADDRESS') {
    let newUserAddress = action.userAddress;
    return {
      accountAddress: {"address": newUserAddress},
      accountAssets: state.accountAssets
    }
  } else if (action.type === 'ADD_ACCOUNT_ASSETS') {
    let refreshedAccountAssets = action.accountAssets;
    return {
      accountAddress: state.accountAddress,
      accountAssets: refreshedAccountAssets
    }
  }
  return state;
}

export default accountReducer;
