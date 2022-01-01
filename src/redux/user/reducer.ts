import {ActionTypes} from './actiontypes';
import {ActionType} from './types';

export type UserState = {
  profile: ProfileType;
};

export type ProfileType = {
  Name: string;
  Initials: string;
  Designation: string;
};

const initialState = {
  profile: {} as ProfileType,
};

export const UserReducer = (
  state: UserState = initialState,
  action: ActionType,
) => {
  switch (action.type) {
    case ActionTypes.SAVE_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
