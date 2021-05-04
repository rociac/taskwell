import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';

import { setTitle } from '../../redux/title/title.actions';

import Collections from '../../components/collections/collections.component';

import { baseUrl } from '../../utils/utils';

const UserProjects = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const user = useSelector(state => state.user.currentUser);

  if(!user) {
    history.push('/signin');
  }


  useEffect(() => {
    const token = 'Bearer ' + localStorage.getItem('jwt');
    axios({method: 'get', url: `${baseUrl}/api/projects/user_projects`, headers: {'Authorization': token}})
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => console.log('error', error));
  },[]);

  useEffect(() => {
    dispatch(setTitle('My Projects'));
  }, [dispatch]);

  return(
    <div>
      <Collections projects={projects} />
    </div>
  );
};

export default UserProjects