import React, { Component } from 'react'
import M from "materialize-css";

class SingleOrder extends Component {
  componentDidMount() {
    const options = {
      duration: 300,
      onCycleTo: () => {
        console.log("New Slide");
      }
    };

    function onReady() {
      var elems = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elems, options);
    }

    if (document.readyState !== "loading") {
      onReady(); // Or setTimeout(onReady, 0); if you want it consistently async
    } else {
      document.addEventListener("DOMContentLoaded", onReady);
    }

  }

  render() {
    return (
      <ul class="collapsible">
        <li>
          <div class="collapsible-header"><b>ENS: </b> vitalik.eth</div>
          <div class="collapsible-body">
            <div class="card transparent z-depth-0 center-align">
              <div class="card-content black-text">
                <span class="card-title">ENS name: vitalik.eth</span>
                <br/>
                <p>
                  Terms of loan
                </p>
                <br/>
              </div>
              <div class="card-action">
                <a href='/'>Cancel</a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    )
  }
}

export default SingleOrder;
