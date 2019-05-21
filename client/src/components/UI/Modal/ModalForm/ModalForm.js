import React, { Component } from 'react';
import { updateObject, checkValidity } from '../../../../shared/utility';
import Input from '../../../Forms/Input/Input';

class ModalForm extends Component {
  state = {
    quantityControls: {
      quantity: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          name: 'quantity',
          placeholder: 'Quantity',
          min: 0,
          max: this.props.meal ? this.props.meal.quantity : 0
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      mealId: {
        elementType: 'input',
        elementConfig: {
          type: 'hidden',
          name: 'mealId'
        },
        value: this.props.meal ? this.props.meal.id : '',
        validation: {},
        valid: true,
        touched: true
      }
    },
    checkoutControls: {
      billingAddress: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'billing-address',
          placeholder: 'Billing Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'city',
          placeholder: 'City'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    mealControls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'name',
          placeholder: 'Meal Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      price: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          name: 'price',
          placeholder: 'Meal Price',
          min: 10
        },
        value: '',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      image: {
        elementType: 'input',
        elementConfig: {
          type: 'file',
          name: 'image',
          placeholder: 'Meal Image'
        },
        value: '',
        files: [],
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  };

  inputChangeHandler = (e, inputId, controlType) => {
    const controlTypes = {
      checkout: 'checkoutControls',
      quantity: 'quantityControls',
      meal: 'mealControls'
    };
    const controls = controlTypes[controlType];
    const formElement = updateObject(this.state[controls][inputId], {
      value: e.target.value,
      valid: checkValidity(e.target.value, this.state[controls][inputId].validation),
      touched: true
    });

    if (formElement.files) {
      formElement.files = [...e.target.files];
    }

    const form = updateObject(this.state[controls], {
      [inputId]: formElement
    });

    let formIsValid = true;
    for (let inputId in form) {
      formIsValid = form[inputId].valid && formIsValid;
    }

    this.setState({ [controls]: form, formIsValid });
  };

  addToOrders = e => {
    e.preventDefault();
    const formData = {};
    for (let formElementId in this.state.quantityControls) {
      formData[formElementId] = this.state.quantityControls[formElementId].value;
      if (this.state.quantityControls[formElementId].elementConfig.type === 'number') {
        formData[formElementId] = Number(this.state.quantityControls[formElementId].value);
      }
    }
    this.props.addMealToOrders(formData);
  };

  addMealOption = e => {
    e.preventDefault();
    const formData = new FormData();
    for (let formElementId in this.state.mealControls) {
      let data = null;
      switch (this.state.mealControls[formElementId].elementConfig.type) {
        case 'text':
          data = this.state.mealControls[formElementId].value;
          break;
        case 'number':
          data = Number(this.state.mealControls[formElementId].value);
          break;
        case 'file':
          data = this.state.mealControls[formElementId].files[0];
          break;
        default:
          data = this.state.mealControls[formElementId].value;
          break;
      }
      formData.append(formElementId, data);
    }
    this.props.addMeal(formData);
  };

  render() {
    const quantityFormElements = Object.keys(this.state.quantityControls).map(key => {
      return {
        id: key,
        config: this.state.quantityControls[key]
      };
    });
    const checkoutFormElements = Object.keys(this.state.checkoutControls).map(key => {
      return {
        id: key,
        config: this.state.checkoutControls[key]
      };
    });
    const mealFormElements = Object.keys(this.state.mealControls).map(key => {
      return {
        id: key,
        config: this.state.mealControls[key]
      };
    });
    const { classes } = this.props;
    const checkoutForm = (
      <form action="#" method="post" id="checkoutForm">
        <div className={classes.Modal__body}>
          {checkoutFormElements.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
              changed={e => this.inputChangeHandler(e, formElement.id, 'checkout')}
            />
          ))}
        </div>
        <div className={classes.Modal__footer}>
          <button type="button" data-dismiss="modal" onClick={this.props.closeModal}>
            Close
          </button>
          <button type="submit">Checkout</button>
        </div>
      </form>
    );
    const { REACT_APP_ROOT: ROOT } = process.env;
    const imgUrl = this.props.meal ? `${ROOT}${this.props.meal.imageUrl}` : null;
    const quantityForm = this.props.meal ? (
      <form method="post" id="addToOrders" onSubmit={this.addToOrders}>
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
          {quantityFormElements.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
              changed={e => this.inputChangeHandler(e, formElement.id, 'quantity')}
            />
          ))}
        </div>
        <div className={classes.Modal__footer}>
          <button type="button" data-dismiss="modal" onClick={this.props.closeModal}>
            Close
          </button>
          <button type="submit">Add</button>
        </div>
      </form>
    ) : null;
    const mealForm = (
      <form action="#" method="post" id="mealForm" onSubmit={this.addMealOption}>
        <div className={classes.Modal__body}>
          {mealFormElements.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
              changed={e => this.inputChangeHandler(e, formElement.id, 'meal')}
            />
          ))}
        </div>
        <div className={classes.Modal__footer}>
          <button type="button" data-dismiss="modal" onClick={this.props.closeModal}>
            Close
          </button>
          <button type="submit">Add</button>
        </div>
      </form>
    );
    const forms = {
      quantity: quantityForm,
      checkout: checkoutForm,
      meal: mealForm
    };
    return forms[this.props.type];
  }
}

export default ModalForm;
