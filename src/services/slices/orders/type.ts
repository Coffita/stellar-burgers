import { TOrder } from '@utils-types';

export type TOrdersState = {
  isOrderLoading: boolean;
  isOrdersLoading: boolean;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
  data: TOrder[];
};
