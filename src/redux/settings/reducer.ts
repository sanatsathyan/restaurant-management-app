import {ActionTypes} from './actiontypes';
import {ActionType} from './types';

export type SettingsState = {
  taxPercentage: number;
};

const initialState = {
  taxPercentage: 15,
};

export const SettingsReducer = (
  state: SettingsState = initialState,
  action: ActionType,
) => {
  switch (action.type) {
    case ActionTypes.EDIT_TAX_PERCENTAGE:
      return {
        ...state,
        taxPercentage: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
