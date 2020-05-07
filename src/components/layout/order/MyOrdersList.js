import React, { Component } from 'react'
import SingleOrder from './SingleOrder'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";


class MyOrdersList extends Component {

  componentDidMount() {
    const options = {
      duration: 300,
      onCycleTo: () => {
        console.log("New Slide");
      }
    };

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elems, options);
    });
  }

  render() {
    return (
      <ul class="collapsible">
        <SingleOrder />
        <SingleOrder />
        <SingleOrder />
      </ul>
    )
  }

}

export default MyOrdersList;
