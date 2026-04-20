import { TUser } from '@utils-types';

export type TUserState = {
  data: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginError: string | null;
  registerError: string | null;
  updateError: string | null;
};
