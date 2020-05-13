import Web3 from 'web3'
import crtInterface from './interface.json'
import IMG_001 from './assets/img/001.png'
import IMG_004 from './assets/img/004.png'
import IMG_007 from './assets/img/007.png'

const CONTRACT_ADDRESS = '0xf98b18f2b4F5EEB07cD1FE5E93936234cbEa023E'
const IMGS = [IMG_001, IMG_004, IMG_007]

/*

https://api.opensea.io/api/v1/assets/?owner=0xdab358a421f4f911cda7f1514f89e22db0e438cf&order_direction=desc&offset=0&limit=20

https://api.opensea.io/api/v1/assets/?owner=0xd20c29f34ee11ef39b0F14c3dfBc86833dd1d04B&order_direction=desc&offset=0&limit=20

*/


async function getAccounts() {
  return window.ethereum.enable()
}

async function getCards(web3, account) {
  const crt = new web3.eth.Contract(crtInterface, CONTRACT_ADDRESS, { from: account })
  const totalCards = parseInt(await crt.methods.totalCards().call())

  return Promise.all([...Array(totalCards).keys()].map(
    id => crt.methods.cards(id).call()
  ))
}


class GetCards extends Component {
  state = {
    cards: [],
  };

  componentDidMount() {
    this._getAccounts = getAccounts().then(
      accounts => {
        this._getAccounts = null;
        this._web3 = new Web3(window.ethereum);
        this._account = accounts[0];
        this.refreshCards()
      }
    );
  }

  componentWillUnmount() {
    if (this._getAccounts) {
      this._getAccounts.cancel();
    }

    if (this._getCards) {
      this._getCards.cancel();
    }
  }

  refreshCards() {
    this._getCards = getCards(this._web3, this._account).then(
      _cards => {
        this._getCards = null
        this.setState({cards: _cards})
      }
    )
  }

  buyCard(id, price) {
    const crt = new this._web3.eth.Contract(crtInterface, CONTRACT_ADDRESS, {from: this._account})
    console.log(crt.options)
    crt.methods.buyCard(id).send({value: price+1}).on('confirmation', () => {
      this.refreshCards();
    })
  }

  render() {
    const cards = this.state.cards.map(card =>
      // <p>{card.price} {card.owner} {card.species}</p>
      <figure>
        <img src={IMGS[parseInt(card.species)]} />
        <figcaption>Price: {card.price} | Owner: {card.owner} | <button onClick={()=> this.buyCard(card.id, parseInt(card.price))}>Buy</button></figcaption>
      </figure>
    )
    return (
        <div>
          {cards}
        </div>
    );
  }
}

export default GetCards;
