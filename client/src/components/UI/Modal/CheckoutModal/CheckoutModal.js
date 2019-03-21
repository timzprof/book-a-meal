import React from 'react';
import classes from '../Modal.module.css';
import formClasses from '../../../Forms/Form.module.css';

const checkoutModal = props => {
  return (
    <form action="#" method="post" id="checkoutForm">
      <div className={classes.Modal__body}>
        <div class="form-group">
          <input type="text" class="form-field" placeholder="Billing Address" required />
        </div>
        <div class="form-group">
          <input type="text" class="form-field" placeholder="City" required />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" data-dismiss="modal">
          Close
            </button>
        <button type="submit">Checkout</button>
      </div>
    </form>
  );
};

export default checkoutModal;