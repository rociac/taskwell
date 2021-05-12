import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';

import { setTitle } from '../../redux/title/title.actions';

import { baseUrl } from '../../utils/utils';

import Collections from '../../components/collections/collections.component';

import styles from './favorites.module.scss';


const Favorites = () => {
  const history = useHistory();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
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
      })
      .catch(error => console.log('error', error));
      setLoading(true);
  }, []);

  useEffect(() => {
    dispatch(setTitle('Favorites'))
  }, [dispatch]);

  return(
    <div>
      {
        projects.length === 0 &&
        <h2 className={styles.centered}>You don't have any favorites!</h2>
      }
      {
        loading ? <p>Loading...</p> : <Collections projects={projects} />
      }
    </div>
  )
};

export default Favorites;