import React, {Component} from 'react'
import NewLeaseOfferCard from '../leasing/newlease/NewLeaseOfferCard'
import NewLoanRequestModalContent from '../loans/newloan/NewLoanRequestModalContent'
import M from "materialize-css";

class SingleCard extends Component {

  componentDidMount() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  }

  render() {
    const modalContent = this.props.type === "lease" ? (
      <NewLeaseOfferCard nft={this.props.nft} />
    ) : (
      <NewLoanRequestModalContent nft={this.props.nft} />
    )

    return (
        <div className="col s6 m4">
          <div className="card my-card">
            <div className="card-image card-image-mycard waves-effect waves-block waves-light">
              <img className="activator image-mycard" src={this.props.nft.image_url} />
            </div>
            <div className="card-content card-content-mycard">
              <div className="card-title activator grey-text text-darken-3 center-align">{this.props.nft.name}</div>
            </div>
            <div className="card-action">
              <a className="btn waves-effect waves-light modal-trigger indigo lighten-1"
                href={"#modal" + this.props.nft.token_id + this.props.nft.asset_contract.address}>Use this NFT</a>
            </div>
            <div className="card-reveal">
              <div className="card-title">
                <div className="row">
                  <div className="col s2 m2 card-asset-content">
                  </div>
                  <div className="col s8 m8">
                    <div className="card-title grey-text text-darken-3 center-align">{this.props.nft.name}</div>
                  </div>
                  <div className="col s2 m2">
                    <i className="material-icons">close</i>
                  </div>
                </div>
              </div>
              <div>
                <p className="grey-text text-darken-3"><b>Description:</b> {this.props.nft.description}</p>
                <p className="grey-text text-darken-3"><b>Create by:</b> {this.props.nft.asset_contract.name}</p>
                <p className="grey-text text-darken-3"><b>Number of sales:</b> {this.props.nft.sell_orders.length}</p>
                <p className="grey-text text-darken-3">Find out more about this asset on <b><a className="btn waves-effect waves-light indigo lighten-1 button-offer" target="_blank" href={this.props.nft.permalink}>OpenSea</a></b></p>
              </div>
            </div>
          </div>
          <div className="center-align">
            <div id={"modal" + this.props.nft.token_id + this.props.nft.asset_contract.address} className="modal modal-fixed-footer">
              <div className="modal-content">
                {modalContent}
              </div>
              <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Close</a>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default SingleCard;
