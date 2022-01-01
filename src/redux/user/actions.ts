import {ActionTypes} from './actiontypes';
import {ProfileType} from './reducer';

export const SaveProfile = (profile: ProfileType) => {
  return {
    type: ActionTypes.SAVE_PROFILE,
    payload: profile,
  };
};
