import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from '../Form.module.css';
import FormWrapper from '../FormWrapper/FormWrapper';
import FormHeadText from '../FormHeadText/FormHeadText';
import Aux from '../../../hoc/auxiliary';
import Overlay from '../../UI/Overlay/Overlay';
import useGlobal from '../../../store';

const userLogin = props => {
  const [globalState, globalActions] = useGlobal();
  const [state, setState] = useState({ email: '', password: '' });

  const handleUserLogin = async e => {
    e.preventDefault();
    globalActions.toast.toast('info', 'Loading');
    const res = await globalActions.auth.signUserIn({ ...state });
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
          action="#"
          method="post"
          className={classes.Page_form}
          id="loginForm"
          onSubmit={handleUserLogin}
        >
          <FormHeadText user="user" type="login" />
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
              type="password"
              name="password"
              className={classes.Form_field}
              placeholder="Your Password"
              required
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Login</button>
          <p className={classes.Page_link}>
            No Account? <Link to="/register">Register</Link>
          </p>
          <p className={classes.Page_link}>
            Back to Home? <Link to="/">Click Here</Link>
          </p>
        </form>
      </FormWrapper>
    </Aux>
  );
};

export default userLogin;
