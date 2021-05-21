import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';

import Collections from '../../components/collections/collections.component';

import { setTitle } from '../../redux/title/title.actions';

import { baseUrl } from '../../utils/utils';

import styles from './homepage.module.scss';

const HomePage = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('jwt');
    axios({method: 'get', url: `${baseUrl}/api/projects`, headers: {'Authorization': token }})
      .then(response => {
        setCollections(response.data);
        setLoading(false);
      })
      .catch(error => console.log('error', error));
  },[]);

  useEffect(() => {
    dispatch(setTitle('Home'));
  }, [dispatch]);

  const renderContent = () => {
    if(loading) {
      return <CircularProgress color="secondary" />;
    } else {
      return <Collections projects={collections}/>;
    }
  }

  return(
    <div className={styles.container}>
      {renderContent()}
    </div>
  );
};

export default HomePage;