import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { setTitle } from '../../redux/title/title.actions';

import { baseUrl } from '../../utils/utils';

import styles from './new-project.module.scss';

const NewProject = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);

  if(!user) {
    history.push('/signin');
  }

  useEffect(() => {
    dispatch(setTitle('Add New Project'))
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    const token = 'Bearer ' + localStorage.getItem('jwt');
    const formData = new FormData(e.target);

    axios({method: 'post', url: `${baseUrl}/api/projects`, headers: {'Authorization': token, 'Accept': 'application/json'}, data: formData})
      .then(response => {
        history.push(`/projects/${response.data.id}`);
      })
      .catch(error => console.log('error', error));
  }

  return(
    <div className={styles.container} >
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormInput 
          name="image"
          type="file"
          accept="image/*"
        />
        <FormInput 
          name="name"
          type="text"
          placeholder="Name"
        />
        <FormInput 
          name="project_type"
          type="text"
          placeholder="Project Type"
        />
        <FormInput 
          name="live_link"
          type="text"
          placeholder="Live link"
        />
        <textarea
          className={styles.textArea}
          name="description"
          placeholder="Project Description"
        />
        <div className={styles.buttonContainer}>
          <CustomButton className={`${styles.orange} ${styles.rounded}`} type="submit">Add New Project</CustomButton>
        </div>
      </form>
    </div>
  )
};

export default NewProject;