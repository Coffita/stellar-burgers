import { TIngredient } from '@utils-types';

export type TIngredientsState = {
  data: TIngredient[];
  isLoading: boolean;
  error: string | null;
};
