import React from 'react';

import styles from './burger-icon.module.scss';

const BurgerIcon = ({open, setOpen}) => {

  return(
    <div className={styles.burger} open={open} onClick={() => setOpen(!open)}>
      <div style={{transform: open ? 'rotate(50deg)' : 'rotate(0)'}} />
      <div style={{transform: open ? 'translateX(20px)' : 'translateX(0)', opacity: open ? '0' : '1'}} />
      <div style={{transform: open ? 'rotate(-50deg)' : 'rotate(0)'}} />
    </div>
  );
};

export default BurgerIcon;