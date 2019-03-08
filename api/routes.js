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

router.get('/meals/', AuthController.verifyAdmin, MealController.getMealOptions);

router.post(
  '/meals/',
  trimRequest.body,
  AuthController.verifyAdmin,
  MealMiddleware.validateAddMeal,
  MealController.addMealOption
);

router.put(
  '/meals/:id',
  trimRequest.body,
  AuthController.verifyAdmin,
  MealMiddleware.validateUpdateMeal,
  MealController.updateMealOption
);

router.delete('/meals/:id', AuthController.verifyAdmin, MealController.deleteMealOption);

router.get('/menu/', AuthController.verifyUser, MenuController.getMenus);

router.get('/menu/caterer', AuthController.verifyAdmin, MenuController.getSingleMenu);

router.post(
  '/menu/',
  trimRequest.body,
  AuthController.verifyAdmin,
  MealMiddleware.validateAddMealToMenu,
  MenuController.addMealToMenu
);

router.get('/orders', AuthController.verifyAdmin, OrderController.getOrders);

router.get('/orders/user', AuthController.verifyUser, OrderController.getOrderItems);

router.post(
  '/orders',
  trimRequest.body,
  AuthController.verifyUser,
  OrderMiddleware.validateAddToOrder,
  OrderController.addToOrders
);

router.put(
  '/orders/:orderId',
  trimRequest.body,
  AuthController.verifyUser,
  OrderMiddleware.validateModifyOrder,
  OrderController.modifyOrder
);

router.post(
  '/orders/checkout',
  trimRequest.body,
  AuthController.verifyUser,
  OrderMiddleware.validateOrdeCheckout,
  OrderController.checkoutOrders
);

export default router;
