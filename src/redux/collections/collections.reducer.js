import { CollectionsActionTypes } from './collections.types';

const INITIAL_STATE = {
  collections: []
}

const collectionsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CollectionsActionTypes.SET_COLLECTIONS:
      return action.payload;
    default: 
      return state;
  }
};

export default collectionsReducer;