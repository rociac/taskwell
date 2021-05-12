import React, { useEffect } from 'react';
import {Route, Switch} from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import HomePage from './pages/homepage/homepage.component';
import SignUp from './pages/sign-up/sign-up.component';
import SignIn from './pages/sign-in/sign-in.component';
import Header from './components/header/header.component';
import NewProject from './pages/new-project/new-project.component';
import Project from './pages/project/project.component';
import PrivateRoute from './components/private-route/private-route.component';
import UserProjects from './pages/user-projects/user-projects.component';
import Favorites from './pages/favorites/favorites.component';

import { setCurrentUser } from './redux/user/user.actions';
import { setLoggedIn } from './redux/auth/auth.actions';

import { baseUrl } from './utils/utils';

import './App.scss';

const App = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const title = useSelector(state => state.title);

  useEffect(() => {
    if(localStorage.getItem('jwt')) {
      const token = 'Bearer ' + localStorage.getItem('jwt');
      axios({ method: 'get', url: `${baseUrl}/current_user`, headers: {'Authorization': token }})
        .then(response => {
          dispatch(setCurrentUser(response.data));
          dispatch(setLoggedIn(true));
        })
        .catch(error => {
          console.log(error);
          if(title !== 'Home') {
            history.push('/signin');
          }
        })
    }
  });

  return (
    <>
      <div>
      { title.length > 0  ?
          <Header />
        :
        null
      }
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
          <PrivateRoute isLoggedIn={isLoggedIn} path='/new-project' component={NewProject} />
          <PrivateRoute isLoggedIn={isLoggedIn} path='/projects/:id' component={Project} />
          <PrivateRoute isLoggedIn={isLoggedIn} exact path='/projects' component={UserProjects}/>
          <PrivateRoute isLoggedIn={isLoggedIn} path='/favorites' component={Favorites} />
        </Switch>
      </div>
    </>
  );
}

export default App;
