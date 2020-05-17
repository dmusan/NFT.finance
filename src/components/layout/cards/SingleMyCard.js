import React, {Component} from 'react'
import '../../../css/mystyles.css'
import NewOrderCard from '../neworder/NewOrderCard'
import M from "materialize-css";

class SingleMyCard extends Component {

  componentDidMount() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  }

  render() {
    return (

      <div className="col s3 m3">
        <div className="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src={this.props.nft.image_url} />
          </div>
          <div className="card-content">
            <h5>{this.props.nft.name}</h5>
          </div>
          <div class="card-action">
            <a class="btn modal-trigger" href={"#modal" + this.props.nft.token_id+ this.props.nft.asset_contract.address}>Use for loan</a>
          </div>
          <div class="card-reveal">
            <div class="card-title grey-text text-darken-4">
              {this.props.nft.name}
              <i class="material-icons right">close</i>
            </div>
            <div class="">
              <p>{this.props.nft.description}</p>
              <p>Create by: {this.props.nft.asset_contract.name}</p>
              <p>Number of sales in the past: {this.props.nft.sell_orders.length}</p>
              <p>Find out more about this asset and check its history on <a target="_blank" href={this.props.nft.permalink}>OpenSea</a></p>
            </div>
          </div>
        </div>
        <div className="center-align">
          <div id={"modal" + this.props.nft.token_id+ this.props.nft.asset_contract.address} class="modal modal-fixed-footer">
            <div class="modal-content">
              <h4><b>{this.props.nft.name}</b></h4>
              <NewOrderCard nft={this.props.nft}/>
            </div>
            <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default SingleMyCard;
