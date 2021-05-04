import { TitleActionTypes } from './title.types';

export const setTitle = title =>({
  type: TitleActionTypes.SET_TITLE,
  payload: title
});