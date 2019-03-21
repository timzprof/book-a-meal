import React, { Component } from 'react';
import classes from '../Modal.module.css';
import formClasses from '../../../Forms/Form.module.css';

class QuantityModal extends Component {
  constructor(props) {
    super(props);
    this.quantityForm = React.createRef();
  }

  addToOrders = e => {
    e.preventDefault();
    console.log(this);
  };

  render() {
    const jsx =
      this.props.meal !== null ? (
        <form method="post" id="addToOrders" ref={this.quantityForm} onSubmit={this.addToOrders}>
          <div className={classes.Modal__body}>
            <div>
              <div className={classes.Meal__Details__img}>
                <img src={this.props.meal.imageUrl} alt="Meal" />
              </div>
              <div>
                <p>{this.props.meal.name}</p>
                <p>${this.props.meal.price.toFixed(2)}</p>
              </div>
            </div>
            <div className={formClasses.Form_group}>
              <input
                type="number"
                className={formClasses.Form_field}
                placeholder="Quantity"
                required
              />
            </div>
          </div>
          <div className={classes.Modal__footer}>
            <button type="button" data-dismiss="modal" onClick={this.props.closeModal}>
              Close
              </button>
            <button type="submit">Add</button>
          </div>
        </form>
      ) : null;
    return jsx;
  }
}

export default QuantityModal;
