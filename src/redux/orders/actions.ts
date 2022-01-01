import {ActionTypes} from './actiontypes';
import {OrderType} from './reducer';

export const AddOrder = (order: OrderType) => {
  return {
    type: ActionTypes.ADD_ORDER,
    payload: order,
  };
};

export const UpdateOrderStatus = (order: OrderType) => {
  return {
    type: ActionTypes.STATUS_UPDATE,
    payload: order,
  };
};

export const ImportOrders = (orders: OrderType[]) => {
  return {
    type: ActionTypes.IMPORT_ORDERS,
    payload: orders,
  };
};
