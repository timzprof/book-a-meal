import React from 'react';
import classes from '../Form.module.css';
import FormWrapper from '../FormWrapper/FormWrapper';
import FormHeadText from '../FormHeadText/FormHeadText';

const userRegister = (props) => {
  return (
    <FormWrapper>
      <form action="#" method="post" className={classes.Page_form} id="registerForm">
        <FormHeadText user="user" type="register" />
        <div className={classes.Form_group}>
          <input
            type="text"
            name="name"
            className={classes.Form_field}
            placeholder="Your Name"
            required
          />
        </div>
        <div className={classes.Form_group}>
          <input
            type="email"
            name="email"
            className={classes.Form_field}
            placeholder="Your Email"
            required
          />
        </div>
        <div className={classes.Form_group}>
          <input
            type="tel"
            name="phone"
            className={classes.Form_field}
            placeholder="Your Phone Number"
            required
          />
        </div>
        <div className={classes.Form_group}>
          <input
            type="password"
            name="password"
            className={classes.Form_field}
            placeholder="Your Password"
            required
          />
        </div>
        <div className={classes.Form_group}>
          <input
            type="password"
            name="confirm_password"
            className={classes.Form_field}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit">Register</button>
        <p className={classes.Page_link}>
          Already Have an Account? <a href="/login">Login</a>
        </p>
        <p className={classes.Page_link}>
          Back to Home? <a href="/">Click Here</a>
        </p>
      </form>
    </FormWrapper>
  );
}

export default userRegister;