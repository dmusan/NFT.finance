const initState = {
  accountAddress: {"address": ""},
  accountAssets: []
}

const accountReducer = (state = initState, action) => {
  // TODO: add case switch
  if (action.type === 'ADD_ACCOUNT_ADDRESS') {
    let newUserAddress = action.userAddress;
    console.log(action.userAddress);
    return {
      accountAddress: {"address": newUserAddress},
      accountAssets: state.accountAssets
    }
  } else if (action.type === 'ADD_ACCOUNT_ASSETS') {
    let refrshedAccountAssets = action.accountAssets;
    return {
      accountAddress: state.accountAddress,
      accountAssets: refrshedAccountAssets
    }
  }
  return state;
}

export default accountReducer;
