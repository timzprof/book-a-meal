import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../Form.module.css';
import FormWrapper from '../FormWrapper/FormWrapper';
import FormHeadText from '../FormHeadText/FormHeadText';

const userLogin = (props) => {
  return (
    <FormWrapper>
      <form action="#" method="post" className={classes.Page_form} id="loginForm">
        <FormHeadText user="user" type="login" />
        <div className={classes.Form_group}>
          <input type="email" name="email" className={classes.Form_field} placeholder="Your Email" required />
        </div>
        <div className={classes.Form_group}>
          <input type="password" name="password" className={classes.Form_field} placeholder="Your Password" required />
        </div>
        <button type="submit">Login</button>
        <p className={classes.Page_link}>No Account? <Link to="/register">Register</Link></p>
        <p className={classes.Page_link}>Back to Home? <Link to="/">Click Here</Link></p>
      </form>
    </FormWrapper>
  );
}

export default userLogin;