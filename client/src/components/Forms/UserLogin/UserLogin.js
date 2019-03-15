import React from 'react';
import classes from '../Form.module.css';

const userLogin = (props) => {
  return (
    <main className={classes.Form_wrapper}>
      <section className={classes.Form_page}>
        <form action="#" method="post" className={classes.Page_form} id="loginForm">
          <h3>
            <span className="Red">B</span>ook
          <span className="Red">A</span>
            Mea<span className="Red">l</span> User <span className="Red">Login</span></h3>
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
      </section>
    </main>
  );
}

export default userLogin;