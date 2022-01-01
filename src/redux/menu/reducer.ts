import {ActionTypes} from './actiontypes';
import {ActionType} from './types';

export type MenuState = {
  isLoading: boolean;
  searchTerm: string;
  items: MenuType[];
  filteredItems: MenuType[];
};

export type MenuType = {
  FoodId: string;
  FoodName: string;
  FoodCategory: string;
  Price: number;
};

const initialState = {
  isLoading: false,
  searchTerm: '',
  items: [],
  filteredItems: [],
};

function getFilteredItems(state: MenuState) {
  return state.items;
}

export const MenuReducer = (
  state: MenuState = initialState,
  action: ActionType,
) => {
  switch (action.type) {
    case ActionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
        filteredItems: state.items.filter(item =>
          item.FoodName.toLocaleLowerCase().includes(
            action.payload.toLocaleLowerCase(),
          ),
        ),
      };
    case ActionTypes.ADD_MENU:
      return {
        ...state,
        items: [...state.items, action.payload],
        filteredItems: getFilteredItems({
          ...state,
          items: [...state.items, action.payload],
        }),
      };
    case ActionTypes.EDIT_MENU:
      const updatedItems = state.items.filter(
        item => item.FoodId !== action.payload.FoodId,
      );
      updatedItems.push(action.payload);

      const updatedFilteredItems = state.filteredItems.filter(
        item => item.FoodId !== action.payload.FoodId,
      );
      updatedFilteredItems.push(action.payload);

      return {
        ...state,
        items: updatedItems,
        filteredItems: updatedFilteredItems,
      };
    case ActionTypes.DELETE_MENU:
      return {
        ...state,
        items: state.items.filter(item => item.FoodId !== action.payload),
        filteredItems: state.filteredItems.filter(
          item => item.FoodId !== action.payload,
        ),
      };
    case ActionTypes.IMPORT_MENU:
      return {
        ...state,
        items: action.payload,
        filteredItems: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
