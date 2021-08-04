import { CollectionsActionTypes } from './collections.types';

export const setCollections = collections => ({
  type: CollectionsActionTypes.SET_COLLECTIONS,
  payload: collections
});