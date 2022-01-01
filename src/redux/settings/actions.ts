import {ActionTypes} from './actiontypes';

export const EditTaxPercentage = (value: number) => {
  return {
    type: ActionTypes.EDIT_TAX_PERCENTAGE,
    payload: value,
  };
};
