import {
  IAdditionalCharges,
  ICartOrder,
} from '../../scenes/app/tabs/menu/interfaces';
import {ActionTypes} from './actiontypes';
import {ActionType} from './types';

export type OrderState = {
  isLoading: boolean;
  orders: OrderType[];
  filteredOrders: OrderType[];
};

export type OrderType = {
  OrderId: string;
  Date: Date;
  MemberId: string;
  KOTId: string;
  Orders: ICartOrder[];
  BillAmount: number;
  Tax: number;
  AdditionalCharges: IAdditionalCharges[];
  TotalBillAmount: number;
  Status: string;
  Comments?: string | '';
};

const initialState = {
  isLoading: false,
  orders: [],
  filteredOrders: [],
};

function getFilteredItems(state: OrderState) {
  return state.orders;
}

export const OrderReducer = (
  state: OrderState = initialState,
  action: ActionType,
) => {
  switch (action.type) {
    case ActionTypes.ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        filteredOrders: getFilteredItems({
          ...state,
          orders: [...state.orders, action.payload],
        }),
      };
    case ActionTypes.STATUS_UPDATE:
      const updatedOrders = state.orders.filter(
        order => order.OrderId !== action.payload.OrderId,
      );
      updatedOrders.push(action.payload);

      const updatedFilteredOrders = state.filteredOrders.filter(
        order => order.OrderId !== action.payload.OrderId,
      );
      updatedFilteredOrders.push(action.payload);

      return {
        ...state,
        orders: updatedOrders,
        filteredOrders: updatedFilteredOrders,
      };
    case ActionTypes.IMPORT_ORDERS:
      return {
        ...state,
        orders: action.payload,
        filteredOrders: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
