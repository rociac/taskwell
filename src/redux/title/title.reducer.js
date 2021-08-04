import { TitleActionTypes } from './title.types';

const INITIAL_STATE = {
  title: ''
}

const titleReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case TitleActionTypes.SET_TITLE:
      return action.payload;  
    default:
      return state;
  }
};

export default titleReducer;