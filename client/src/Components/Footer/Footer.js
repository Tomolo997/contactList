import classes from './Footer.module.css';
import React from 'react';

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <p className={classes.Paragraph}>
        {' '}
        All rights reserved by @TomažOvsenjak
      </p>{' '}
    </footer>
  );
};

export default Footer;
