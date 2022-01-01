export interface ICart {
  MemberId: string;
  KOTId: string;
  Orders: ICartOrder[];
}

export interface ICartOrder {
  FoodId: string;
  FoodName: string;
  Price: number;
  Quantity: number;
}

export interface IAdditionalCharges {
  ChargeName: string;
  ChargeDisplayName: string;
  ChargeValue: number;
}
