import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from '../Form.module.css';
import FormWrapper from '../FormWrapper/FormWrapper';
import FormHeadText from '../FormHeadText/FormHeadText';
import Aux from '../../../hoc/auxiliary';
import Overlay from '../../UI/Overlay/Overlay';
import useGlobal from '../../../store';

const userRegister = props => {
  const [globalState, globalActions] = useGlobal();
  const [state, setState] = useState();

  const handleUserRegister = async e => {
    e.preventDefault();
    console.log(state);
    if (state.confirm_password !== state.password) {
      globalActions.toast.toast('warning', 'Passwords Do not match');
      return;
    }
    const res = await globalActions.auth.signUserUp({ ...state });
    globalActions.toast.toast(res.status, res.message);
    if (res.status === 'success') {
      props.history.push('/menu');
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(state => {
      return {
        ...state,
        [name]: value
      };
    });
  };

  return (
    <Aux>
      <Overlay show={globalState.overlay} />
      <FormWrapper>
        <form
          onSubmit={handleUserRegister}
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
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.Form_group}>
            <input
              type="email"
              name="email"
              className={classes.Form_field}
              placeholder="Your Email"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.Form_group}>
            <input
              type="tel"
              name="phone"
              className={classes.Form_field}
              placeholder="Your Phone Number"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.Form_group}>
            <input
              type="password"
              name="password"
              className={classes.Form_field}
              placeholder="Your Password"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.Form_group}>
            <input
              type="password"
              name="confirm_password"
              className={classes.Form_field}
              placeholder="Confirm Password"
              required
              onChange={handleInputChange}
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
    </Aux>
  );
};

export default userRegister;
