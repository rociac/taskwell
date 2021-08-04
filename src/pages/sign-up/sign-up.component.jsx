import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import { setTitle } from '../../redux/title/title.actions';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { baseUrl } from '../../utils/utils';
import { splitAuthHeader } from '../../utils/utils';

import styles from './sing-up.module.scss';

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const image = new File([''], '', {type: 'image/*'});
  const [formValues, setFormValues] = useState({
    avatar: image,
    username: '',
    firstName: '',
    lastName: '',
    siteUrl: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  useEffect(() => {
    dispatch(setTitle(''));
  }, [dispatch]);

  const handleChange = e => {
    setFormValues(prevValues => {
      return { ...prevValues, [e.target.name]: e.target.value }
    });
  }

  const handleImage = e => {
    setFormValues(prevValues => {
      return { ...prevValues, avatar: e.target.files[0]}
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(formValues.password !== formValues.passwordConfirmation) {
      alert("passwords don't match");
      return;
    };

    const request = { 
      "user": {
        "avatar": formValues.avatar,
        "username": formValues.username,
        "first_name": formValues.firstName,
        "last_name": formValues.lastName,
        "site_url": formValues.siteUrl,
        "email": formValues.email,
        "password": formValues.password,
        "password_confirmation": formValues.passwordConfirmation
      }
    };

    const formData = new FormData();

    for(let requestKey in request) {
      if (requestKey === 'user') {
        for(let userKey in request[requestKey]) {
          formData.append(`user[${userKey}]`, request[requestKey][userKey]);
        }
      } else {
        formData.append(requestKey, request[requestKey]);
      }
    };

    axios({method: 'post', url: `${baseUrl}/signup`, headers: {'Accept': 'application/json'}, data: formData})
      .then(response => {
        const token = splitAuthHeader(response.headers.authorization);
        localStorage.setItem('jwt', token);
        history.push('/');
      })
      .catch(error => console.log('error', error));
  };

  return(
    <div className={styles.container}>
      <div className={styles.filter} />
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Sign Up</h1>
          <p>Sign up and start showcasing your projects!</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormInput
            name="avatar"
            type="file"
            accept="image/*"
            handleChange={handleImage}
          />
          <FormInput
            name="username"
            type="text"
            handleChange={handleChange}
            value={formValues.username}
            placeholder="Username"
          />
          <FormInput
            name="firstName"
            type="text"
            handleChange={handleChange}
            value={formValues.firstName}
            placeholder="First name"
          />
          <FormInput
            name="lastName"
            type="text"
            handleChange={handleChange}
            value={formValues.lastName}
            placeholder="Last name"
          />
          <FormInput
            name="siteUrl"
            type="text"
            handleChange={handleChange}
            value={formValues.siteUrl}
            placeholder="Site URL"
          />
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
          <FormInput
            name="passwordConfirmation"
            type="password"
            handleChange={handleChange}
            value={formValues.passwordConfirmation}
            placeholder="Password Confirmation"
          />
          <div className={styles.buttonContainer}>
            <CustomButton className={`${styles.orange} ${styles.rounded}`} type="submit">Sign Up</CustomButton>
          </div>
        </form>
        <p className={styles.text}>Already have an account? <Link to="/signin">Sign In</Link></p>
      </div>
    </div>
  );
};

export default SignUp;