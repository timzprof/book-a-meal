import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from '../../components/Forms/Form.module.css';
import FormWrapper from '../../components/Forms/FormWrapper/FormWrapper';
import FormHeadText from '../../components/Forms/FormHeadText/FormHeadText';
import Loading from '../../components/UI/Loading/Loading';
import Input from '../../components/Forms/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';
import { signUp } from '../../redux/action';

class UserRegister extends PureComponent {
  state = {
    controls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'name',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'tel',
          name: 'phone',
          placeholder: 'Your Phone Number'
        },
        value: '',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          name: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 7
        },
        valid: false,
        touched: false
      },
      confirm_password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          name: 'confirm_password',
          placeholder: 'Confirm Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 7
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  };

  handleUserRegister = e => {
    e.preventDefault();
    const formData = {};
    for (let formElementId in this.state.controls) {
      formData[formElementId] = this.state.controls[formElementId].value;
    }
    this.props.onUserSignUp({...formData, type: 'user'}).then(() => this.props.history.push('/menu'))
    .catch(error => console.log(error));;
  };

  inputChangeHandler = (e, inputId) => {
    const formElement = updateObject(this.state.controls[inputId], {
      value: e.target.value,
      valid: checkValidity(e.target.value, this.state.controls[inputId].validation),
      touched: true
    });

    const form = updateObject(this.state.controls, {
      [inputId]: formElement
    });

    let formIsValid = true;
    for (let inputId in form) {
      formIsValid = form[inputId].valid && formIsValid;
    }

    this.setState({ controls: form, formIsValid });
  };

  render() {
    const { loading } = this.props;

    const formElements = Object.keys(this.state.controls).map(key => {
      return {
        id: key,
        config: this.state.controls[key]
      };
    });

    return loading ? (
      <Loading />
    ) : (
      <FormWrapper>
        <form
          onSubmit={this.handleUserRegister}
          action="#"
          method="post"
          className={classes.Page_form}
          id="registerForm"
        >
          <FormHeadText user="user" type="register" />
          {formElements.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
              changed={e => this.inputChangeHandler(e, formElement.id)}
            />
          ))}
          <button type="submit">Register</button>
          <p className={classes.Page_link}>
            Already Have an Account? <Link to="/login">Login</Link>
          </p>
          <p className={classes.Page_link}>
            Back to Home? <Link to="/">Click Here</Link>
          </p>
        </form>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUserSignUp: data => dispatch(signUp(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserRegister));
