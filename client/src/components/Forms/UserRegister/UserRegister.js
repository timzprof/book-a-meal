import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from '../Form.module.css';
import FormWrapper from '../FormWrapper/FormWrapper';
import FormHeadText from '../FormHeadText/FormHeadText';
import { success , warning} from '../../../actions/toast';

class UserRegister extends Component {
  state = {}
  handleUserRegister = e => {
    e.preventDefault();
    if(this.state.confirm_password !== this.state.password) {
      warning('Passwords Do not match');
    }
    console.log(this.state);
  };

  handleInputChange = e => { 
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <FormWrapper>
        <form
          onSubmit={this.handleUserRegister}
          action="#"
          method="post"
          className={classes.Page_form}
          id="registerForm"
        >
          <FormHeadText user="user" type="register" />
          <div className={classes.Form_group}>
            <input
              type="text"
              name="name"
              className={classes.Form_field}
              placeholder="Your Name"
              required
              onChange={this.handleInputChange}
            />
          </div>
          <div className={classes.Form_group}>
            <input
              type="email"
              name="email"
              className={classes.Form_field}
              placeholder="Your Email"
              required
              onChange={this.handleInputChange}
            />
          </div>
          <div className={classes.Form_group}>
            <input
              type="tel"
              name="phone"
              className={classes.Form_field}
              placeholder="Your Phone Number"
              required
              onChange={this.handleInputChange}
            />
          </div>
          <div className={classes.Form_group}>
            <input
              type="password"
              name="password"
              className={classes.Form_field}
              placeholder="Your Password"
              required
              onChange={this.handleInputChange}
            />
          </div>
          <div className={classes.Form_group}>
            <input
              type="password"
              name="confirm_password"
              className={classes.Form_field}
              placeholder="Confirm Password"
              required
              onChange={this.handleInputChange}
            />
          </div>
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

export default UserRegister;
