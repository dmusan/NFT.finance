import React, {Component} from 'react'
import NewOrderCard from './NewOrderCard'
import M from "materialize-css";
import '../../../css/mystyles.css'

class ModalOrder extends Component {
  componentDidMount() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

  }

  render() {
    return (
      <div className="container">
        <div id="modal1" class="modal modal-fixed-footer">
          <div class="modal-content">
            <h4>Modal Header</h4>
            <NewOrderCard />
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalOrder;
