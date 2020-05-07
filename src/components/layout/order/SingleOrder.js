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
  <div class="collapsible-header"><i class="material-icons">place</i>Third</div>
  <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
</li>
</ul>
  )
}
}

export default SingleOrder;
