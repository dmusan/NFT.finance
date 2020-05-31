const initState = {
  leaseOffers: [],
  leaseAssets: []
}

const leaseReducer = (state = initState, action) => {
  if (action.type === 'ADD_LEASE_OFFERS') {
    let newLeaseOffers = action.leaseOffers;
    return {
      leaseOffers: newLeaseOffers,
      leaseAssets: state.leaseAssets
    }
  } else if (action.type === 'ADD_LEASE_ASSETS') {
    let refrshedLeaseAssets = action.leaseAssets;
    return {
      leaseOffers: state.leaseOffers,
      leaseAssets: refrshedLeaseAssets
    }
  }
  return state;
}

export default leaseReducer;
