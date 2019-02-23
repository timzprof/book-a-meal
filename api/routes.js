import { Router } from 'express';
import trimRequest from 'trim-request';
import UserMiddleware from './middleware/user';
import CatererMiddleware from './middleware/caterer';
import MealMiddleware from './middleware/meals';
import OrderMiddleware from './middleware/order';
import AuthController from './controllers/auth';
import MealController from './controllers/meals';
import MenuController from './controllers/menu';
import OrderController from './controllers/orders';
import UserController from './controllers/user';
import CatererController from './controllers/caterer';

const router = Router();

router.post(
  '/auth/signup',
  trimRequest.body,
  UserMiddleware.validateRegister,
  UserController.registerUser
);

router.post(
  '/auth/login',
  trimRequest.body,
  UserMiddleware.validateLogin,
  UserController.loginUser
);

router.post(
  '/auth/caterer/signup',
  trimRequest.body,
  CatererMiddleware.validateRegister,
  CatererController.registerCaterer
);

router.post(
  '/auth/caterer/login',
  trimRequest.body,
  CatererMiddleware.validateLogin,
  CatererController.loginCaterer
);

router.get(
  '/meals/',
  AuthController.checkForToken,
  AuthController.verifyAdminToken,
  MealController.getMealOptions
);

router.post(
  '/meals/',
  trimRequest.body,
  AuthController.checkForToken,
  AuthController.verifyAdminToken,
  MealMiddleware.validateAddMeal,
  MealController.addMealOption
);

router.put(
  '/meals/:id',
  trimRequest.body,
  AuthController.checkForToken,
  AuthController.verifyAdminToken,
  MealMiddleware.validateUpdateMeal,
  MealController.updateMealOption
);

router.delete(
  '/meals/:id',
  AuthController.checkForToken,
  AuthController.verifyAdminToken,
  MealController.deleteMealOption
);

router.get(
  '/menu/',
  AuthController.checkForToken,
  AuthController.verifyUserToken,
  MenuController.getMenus
);

router.get(
  '/menu/caterer',
  AuthController.checkForToken,
  AuthController.verifyAdminToken,
  MenuController.getSingleMenu
);

router.post(
  '/menu/',
  trimRequest.body,
  AuthController.checkForToken,
  AuthController.verifyAdminToken,
  MealMiddleware.validateAddMealToMenu,
  MenuController.addMealToMenu
);

router.get(
  '/orders',
  AuthController.checkForToken,
  AuthController.verifyAdminToken,
  OrderController.getOrders
);

router.get(
  '/orders/user',
  AuthController.checkForToken,
  AuthController.verifyUserToken,
  OrderController.getOrderItems
);

router.post(
  '/orders',
  trimRequest.body,
  AuthController.checkForToken,
  AuthController.verifyUserToken,
  OrderMiddleware.validateAddToOrder,
  OrderController.addToOrders
);

router.put(
  '/orders/:orderId',
  trimRequest.body,
  AuthController.checkForToken,
  AuthController.verifyUserToken,
  OrderMiddleware.validateModifyOrder,
  OrderController.modifyOrder
);

router.post(
  '/orders/checkout',
  trimRequest.body,
  AuthController.checkForToken,
  AuthController.verifyUserToken,
  OrderMiddleware.validateOrdeCheckout,
  OrderController.checkoutOrders
);

export default router;
