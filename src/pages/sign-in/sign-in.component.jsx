import React, { useEffect, useState} from 'react';
import { post } from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setLoggedIn } from '../../redux/auth/auth.actions';
import { setTitle } from '../../redux/title/title.actions';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { baseUrl } from '../../utils/utils';
import { splitAuthHeader } from '../../utils/utils';

import styles from './sign-in.module.scss';

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    dispatch(setTitle(''));
  }, [dispatch]);

  const handleChange = e => {
    setFormValues(prevValues => {
      return { ...prevValues, [e.target.name]: e.target.value }
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const request = {
      "user": {
        "email": formValues.email,
        "password": formValues.password
      }
    }

    post(`${baseUrl}/login`, request)
      .then(response => {
        const token = splitAuthHeader(response.headers.authorization);
        localStorage.setItem('jwt', token);
        dispatch(setLoggedIn(true));
        history.push('/');
      })
      .catch(error => console.log('error', error));
  }

  return(
    <div className={styles.container}>
      <div className={styles.filter} />
      <div className={styles.content} >
        <div className={styles.header}>
          <h1>Sign In</h1>
          <p>Sign in to showcase your projects!</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormInput 
            name="email"
            type="email"
            handleChange={handleChange}
            value={formValues.email}
            placeholder="Email"
          />
          <FormInput 
            name="password"
            type="password"
            handleChange={handleChange}
            value={formValues.password}
            placeholder="Password"
          />
          <div className={styles.buttonContainer}>
            <CustomButton className={`${styles.orange} ${styles.rounded}`} type="submit">Sign In</CustomButton>
          </div>
        </form>
        <p className={styles.text}>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  )
};

export default SignIn;