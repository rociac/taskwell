import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useOnClickOutside } from '../../hooks/hooks';

import BurgerIcon from '../burger-icon/burger-icon.component';
import SideMenu from '../side-menu/side-menu.component';


import styles from './header.module.scss';


const Header = () => {
  const node = useRef();
  const [open, setOpen] = useState(false);
  const title = useSelector(state => state.title);

  useOnClickOutside(node, () => setOpen(false));

  return(
    <div ref={node}>
      <SideMenu open={open} />
      <div className={styles.header}>
        <div className={styles.container}>
          <BurgerIcon open={open} setOpen={setOpen} />
          <p className={styles.text}>{`${title}`}</p>
          <Link to="/new-project"><FontAwesomeIcon icon={faPlus} className={styles.icon} /></Link>
        </div>
      </div>
    </div>
  )
}

export default Header;