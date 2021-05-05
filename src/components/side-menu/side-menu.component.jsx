import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { setLoggedIn } from '../../redux/auth/auth.actions';

import { baseUrl } from '../../utils/utils';

import styles from './side-menu.module.scss'

const SideMenu = ({ open }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    const token = 'Bearer ' + localStorage.getItem('jwt');
    axios({method: 'delete', url: `${baseUrl}/logout`, headers: {'Authorization': token}})
      .then(response => {
        console.log(response.data);
        localStorage.removeItem('jwt');
        history.push('/signin');
        dispatch(setLoggedIn(false));
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className={`${styles.sideMenu} ${open ? styles.opened : null}`}>
    {     
      user && 
        <div className={styles.userInfo}>
          <div className={styles.imageContainer}>
            <img className={styles.avatar} src={user.avatar_url} alt=""/>
          </div>
          <p className={styles.name}>{`${user.first_name} ${user.last_name}`}</p>
          <p className={styles.userName}>&#64;{user.username}</p>
        </div>
    }
      <div className={`${styles.navigation} ${!user && styles.centered}`}>
        <Link className={styles.link} to="/">Home</Link>
        <Link className={styles.link} to="/projects">My projects</Link>
        <Link className={styles.link} to="/favorites">Favorites</Link>
      </div>
      {
        isLoggedIn 
        ?
          <p className={styles.authLink} onClick={handleLogout}>Logout</p>
        :
          <Link className={styles.authLink} to="/signin">Sign In</Link>
      }
    </div>
  ) 
   
}

export default SideMenu;