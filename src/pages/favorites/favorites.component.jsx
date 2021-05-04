import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { setTitle } from '../../redux/title/title.actions';

import { baseUrl } from '../../utils/utils';

import Collections from '../../components/collections/collections.component';


const Favorites = () => {
  const [projects, setProjects] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('jwt');
    axios({method: 'get', url: `${baseUrl}/api/user_favorites`, headers: {'Authorization': token}})
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => console.log('error', error));
  }, []);

  useEffect(() => {
    dispatch(setTitle('Favorites'))
  }, [dispatch]);

  return(
    <div>
      <Collections projects={projects} />
    </div>
  )
};

export default Favorites;