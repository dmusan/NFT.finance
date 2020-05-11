import React, {Component} from 'react'
import '../../../css/mystyles.css'
import IMG_001 from "../../../assets/img/001.png"
//import ModalOrder from '../neworder/ModalOrder'

const SingleMyCard = () => {

  return (
    <div className="col s3 m3">
      <div className="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src={IMG_001} />
        </div>
        <div className="card-content">
          <i class ="material-icons large">aspect ratio</i>
          <p>smth</p>
        </div>
        <div class="card-action">
          <a class="btn modal-trigger" href="#modal1">Modal</a>
        </div>
        <div class="card-reveal">
          <div class="card-title grey-text text-darken-4">
            Card Title
            <i class="material-icons right">close</i>
          </div>
          <div class="">
            <p>Here is some more information about this product that is only revealed once clicked on.</p>
          </div>
        </div>
      </div>
    </div>
  )

}

export default SingleMyCard;
