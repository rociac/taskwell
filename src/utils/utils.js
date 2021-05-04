import axios from 'axios';

export const splitAuthHeader = header => {
  return header.split(' ')[1]
}

export const baseUrl = 'https://taskwell-api.herokuapp.com';

export const  fetchCurrentUser = () => {
  
  if(localStorage.getItem('jwt')) {
    const token = 'Bearer ' + localStorage.getItem('jwt');
    axios({method: 'get', url: 'http://localhost:3000/current_user', headers: {'Authorization': token }})
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log('error', error);
        return null;
      });
  } else {
    return null;
  }
};


