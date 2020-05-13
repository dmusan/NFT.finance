const initState = {
  nfts: [
    {id: '1', type: 'ENS', description: 'one of a kind ENS'},
    {id: '2', type: 'Decentraland Land', description: 'good positio land'},
    {id: '3', type: 'Art', description: 'cool ethereum art'}
  ]
}

const rootReducer = (state = initState, action) => {
  console.log(action);
  return state;
}

export default rootReducer;
