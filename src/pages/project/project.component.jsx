import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { setTitle } from '../../redux/title/title.actions';

import { baseUrl } from '../../utils/utils';

import ProjectDetails from '../../components/project-details/project-details.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import styles from './project.module.scss';

const Project = ({ match }) => {
  const { params: { id } } = match;
  const token = 'Bearer ' + localStorage.getItem('jwt');
  const dispatch = useDispatch();
  const [project, setProject] = useState();
  const [alreadyFavorited, setAlreadyFavorited] = useState(false);

  useEffect(() => {
    axios({method: 'get', url: `${baseUrl}/api/projects/${id}`, headers: {'Authorization': token }})
      .then(response => {
        setProject(response.data);
        dispatch(setTitle(response.data.name));
      })
      .catch(error => console.log('error', error));
  },[dispatch, id, token]);

  useEffect(() => {
    axios({method: 'get', url: `${baseUrl}/api/user_favorites`, headers: {'Authorization': token}})
      .then(response => {
        const favorites = response.data;
        if(favorites.find(favorite => favorite.id === project.id)) {
          setAlreadyFavorited(true);
        } else {
          setAlreadyFavorited(false);
        }
      })
      .catch(error => console.log('error', error));
  });

  const handleClick = () => {
    axios({method: 'post', url: `${baseUrl}/api/favorite_projects`, params: {
      project_id: id
    }, headers: {'Authorization': token }})
      .then(() => {
        setAlreadyFavorited(true);
      })
      .catch(error => console.log('error', error));
  };

  const handleRemove = () => {
    axios({method: 'delete', url: `${baseUrl}/api/favorite_projects`, params: {
      project_id: project.id
    }, headers: {'Authorization': token }})
      .then(() => {
        setAlreadyFavorited(false);
      })
      .catch(error => console.log('error', error));
  }

  console.log(alreadyFavorited);

  return(
    <div className={styles.container}>
    {
      project &&
      <ProjectDetails 
        name={project.name}
        type={project.project_type}
        description={project.description}
        liveLink={project.live_link}
        image={project.image_url}
      />
    }
    {
      alreadyFavorited ?
        <CustomButton className={`${styles.red} ${styles.square} ${styles.large} ${styles.fixedBottom}`} onClick={handleRemove}>Remove from favorites</CustomButton>
      :
        <CustomButton className={`${styles.orange} ${styles.square} ${styles.large} ${styles.fixedBottom}`} onClick={handleClick}>Add to favorites</CustomButton>
    }
      
    </div>
  )
};

export default Project;;