import React from 'react';
import classes from '../Modal.module.css';
import formClasses from '../../../Forms/Form.module.css';

const quantityModal = (props) => {
  return (
    <div className={[classes.Modal, classes.Hidden].join(' ')} id="orderQuantityModal" role="dialog">
      <div className={classes.Modal__content}>
        <div className={classes.Modal__header}>
          <h3 className={classes.Modal__title}>
            <span className="Red">B</span>ook
          <span className="Red">A</span>
            Mea<span className="Red">l</span> Add to Orders
          </h3>
          <button type="button" className={['Btn', classes.Close].join(' ')} data-dismiss="modal">&times;</button>
        </div>
        <div className={classes.Modal__body}>
          <form action="#" method="post" id="addToOrders">
            <div>
              <div className={classes.Meal__details__img}>
                <img src="images/meal3.jpg" alt="Meal" />
              </div>
              <div>
                <p>Jollof Rice</p>
                <p>$500.00</p>
              </div>
            </div>
            <div className={formClasses.Form__group}>
              <input type="number" className={formClasses.Form__field} placeholder="Quantity" required />
            </div>
          </form>
        </div>
        <div className={classes.Modal__footer}>
          <button type="button" data-dismiss="modal">Close</button>
          <button type="submit">Add</button>
        </div>
      </div>
    </div>
  );
}

export default quantityModal;