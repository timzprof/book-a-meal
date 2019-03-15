import React from 'react';
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
        <p className={classes.Page_link}>No Account? <a href="/register">Register</a></p>
        <p className={classes.Page_link}>Back to Home? <a href="/">Click Here</a></p>
      </form>
    </FormWrapper>
  );
}

export default userLogin;