import React, {Component} from 'react'
import '../../../css/mystyles.css'

class SingleMyCard extends Component {
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
            <a class="btn modal-trigger" href="#modal1">Use as collateral</a>
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
      </div>
    )
  }
}

export default SingleMyCard;
