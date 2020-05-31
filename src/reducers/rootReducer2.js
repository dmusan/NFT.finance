import accountReducer from './accountReducer'
import leaseReducer from './leaseReducer'
import lendReducer from './lendReducer'
import { combineReducers } from 'redux'

const rootReducer2 = combineReducers({
  account: accountReducer,
  leaseOffers: leaseReducer,
  lendRequests: lendReducer
});

export default rootReducer2;
