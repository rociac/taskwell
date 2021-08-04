import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';

import { setTitle } from '../../redux/title/title.actions';

import { baseUrl } from '../../utils/utils';

import Collections from '../../components/collections/collections.component';

import styles from './favorites.module.scss';


const Favorites = () => {
  const history = useHistory();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);

  if(!user) {
    history.push('/signin');
  }

  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('jwt');
    axios({method: 'get', url: `${baseUrl}/api/user_favorites`, headers: {'Authorization': token}})
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => console.log('error', error));
      
  }, []);

  useEffect(() => {
    dispatch(setTitle('Favorites'))
  }, [dispatch]);

  const renderContent = () => {
    if(loading) {
      return <CircularProgress color="secondary" />;
    } else if(projects.length === 0) {
      <h2 className={styles.centered}>You don't have any favorites!</h2>
    } else {
      return <Collections projects={projects} />
    }
  };

  return(
    <div className={styles.container}>
      {renderContent()}
    </div>
  )
};

export default Favorites;