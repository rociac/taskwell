import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Collections from '../../components/collections/collections.component';

import { setTitle } from '../../redux/title/title.actions';

import { baseUrl } from '../../utils/utils';

import './homepage.styles.scss';

const HomePage = () => {
  const [collections, setCollections] = useState([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('jwt');
    axios({method: 'get', url: `${baseUrl}/api/projects`, headers: {'Authorization': token }})
      .then(response => {
        setCollections(response.data);
        console.log(response.data);
      })
      .catch(error => console.log('error', error));
  },[]);

  useEffect(() => {
    dispatch(setTitle('Home'));
  }, [dispatch]);

  return(
    <div>
      <Collections projects={collections}/>
    </div>
  );
};

export default HomePage;