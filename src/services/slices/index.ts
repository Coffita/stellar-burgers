export { fetchIngredients } from './ingredients/async';
export { ingredientsSlice } from './ingredients/index';

export {
  loginUser,
  logoutUser,
  registerUser,
  fetchUser,
  updateUser
} from './user/async';
export { userSlice } from './user/index';

export {
  burgerConstructorSlice,
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient
} from './burger-constructor/index';

export { createOrder, fetchOrder, fetchOrders } from './orders/async';
export { ordersSlice, clearOrderModalData } from './orders/index';

export { fetchFeeds } from './feeds/async';
export { feedsSlice } from './feeds/index';
