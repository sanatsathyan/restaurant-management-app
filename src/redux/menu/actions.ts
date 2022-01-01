import {ActionTypes} from './actiontypes';
import {MenuType} from './reducer';

export const SetSearchTerm = (searchTerm: string) => {
  return {
    type: ActionTypes.SET_SEARCH_TERM,
    payload: searchTerm,
  };
};

export const AddMenuItem = (menu: MenuType) => {
  return {
    type: ActionTypes.ADD_MENU,
    payload: menu,
  };
};

export const EditMenuItem = (menu: MenuType) => {
  return {
    type: ActionTypes.EDIT_MENU,
    payload: menu,
  };
};

export const DeleteMenuItem = (id: string) => {
  return {
    type: ActionTypes.DELETE_MENU,
    payload: id,
  };
};

export const ImportMenu = (menu: MenuType[]) => {
  return {
    type: ActionTypes.IMPORT_MENU,
    payload: menu,
  };
};
