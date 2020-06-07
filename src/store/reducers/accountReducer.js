const initState = {
  accountAddress: {"address": ""},
  accountAssets: []
}

const accountReducer = (state = initState, action) => {
  // TODO: add case switch
  if (action.type === 'ADD_ACCOUNT_ADDRESS') {
    let newUserAddress = action.userAddress;
    return {
      accountAddress: {"address": newUserAddress},
      accountAssets: state.accountAssets
    }
  } else if (action.type === 'ADD_ACCOUNT_ASSETS') {
    let refreshedAccountAssets = action.accountAssets;
    // console.log(JSON.stringify(refreshedAccountAssets));
    return {
      accountAddress: state.accountAddress,
      accountAssets: refreshedAccountAssets
    }
  }
  return state;
}

// switch (action.type) {
//   case SET_VISIBILITY_FILTER:
//     return Object.assign({}, state, {
//       visibilityFilter: action.filter
//     })
//   default:
//     return state
// }


export default accountReducer;
