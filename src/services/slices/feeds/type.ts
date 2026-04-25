import { TOrder } from '@utils-types';

export type TFeedsState = {
  data: { orders: TOrder[]; total: number; totalToday: number };
  isLoading: boolean;
  error: string | null;
};
