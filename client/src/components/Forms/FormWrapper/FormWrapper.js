import React from 'react';
import classes from '../Form.module.css';

const formWrapper = (props) => (
  <main className={classes.Form_wrapper}>
    <section className={classes.Form_page}>
      { props.children }
    </section>
  </main>
);

export default formWrapper;