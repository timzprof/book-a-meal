import React, { Component } from 'react';

class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.quantityForm = React.createRef();
  }

  addToOrders = e => {
    e.preventDefault();
    console.log(this);
  };

  render() {
    const { classes , formClasses } = this.props;
    const checkoutForm = (
    <form action="#" method="post" id="checkoutForm">
      <div className={classes.Modal__body}>
        <div className={formClasses.Form_group}>
          <input 
            type="text" 
            className={formClasses.Form_field} 
            placeholder="Billing Address" 
            required 
          />
        </div>
        <div className={formClasses.Form_group}>
          <input 
            type="text" 
            className={formClasses.Form_field} 
            placeholder="City" 
            required 
          />
        </div>
      </div>
      <div className={classes.Modal__footer}>
          <button type="button" data-dismiss="modal" onClick={this.props.closeModal}>Close</button>
        <button type="submit">Checkout</button>
      </div>
    </form>
  );
  const { REACT_APP_ROOT: ROOT } = process.env;
  const imgUrl = this.props.meal ? `${ROOT}${this.props.meal.imageUrl}` : null; 
  const quantityForm = this.props.meal ? (
    <form method="post" id="addToOrders" ref={this.quantityForm} onSubmit={this.addToOrders}>
      <div className={classes.Modal__body}>
        <div>
          <div className={classes.Meal__Details__img}>
            <img src={imgUrl} alt="Meal" />
          </div>
          <div>
            <p>{this.props.meal.name}</p>
            <p>${this.props.meal.price}</p>
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
  const forms = {
    quantity: quantityForm,
    checkout: checkoutForm
  };
  return forms[this.props.type];
  }
}

export default ModalForm;