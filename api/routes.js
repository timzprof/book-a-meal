import { Router } from 'express';
import trimRequest from 'trim-request';
import UserMiddleware from './middleware/user';
import MealMiddleware from './middleware/meals';
import OrderMiddleware from './middleware/order';
import AuthController from './controllers/auth';
import MealController from './controllers/meals';
import OrderController from './controllers/orders';
import CateringServiceController from './controllers/catering_service';

const {verifyUser, verifyAdmin} = AuthController;

const router = Router();

router.post(
  '/auth/signup',
  trimRequest.body,
  UserMiddleware.validateRegister,
  AuthController.register
);

router.post(
  '/auth/login',
  trimRequest.body,
  UserMiddleware.validateLogin,
  AuthController.login
);

router.get('/meals', verifyUser, verifyAdmin, MealController.getMealOptions);

router.post(
  '/meals',
  trimRequest.body,
  verifyUser,
  verifyAdmin,
  MealMiddleware.validateAddMeal,
  MealController.addMealOption
);

router.put(
  '/meals/:id',
  trimRequest.body,
  verifyUser,
  verifyAdmin,
  MealMiddleware.validateUpdateMeal,
  MealController.updateMealOption
);

router.delete('/meals/:id', verifyUser, verifyAdmin, MealController.deleteMealOption);

router.get('/menu', verifyUser, CateringServiceController.getCatererMenus);

router.get('/menu/caterer', verifyUser, verifyAdmin, CateringServiceController.getSingleMenu);

router.post(
  '/menu',
  trimRequest.body,
  verifyUser,
  verifyAdmin,
  MealMiddleware.validateAddMealToMenu,
  CateringServiceController.addMealToMenu
);

router.get('/orders', verifyUser, verifyAdmin, OrderController.getOrders);

router.get('/orders/user', verifyUser, OrderController.getOrderItems);

router.post(
  '/orders',
  trimRequest.body,
  verifyUser,
  OrderMiddleware.validateAddToOrder,
  OrderController.addToOrders
);

router.put(
  '/orders/:orderId',
  trimRequest.body,
  verifyUser,
  OrderMiddleware.validateModifyOrder,
  OrderController.modifyOrder
);

router.post(
  '/orders/checkout',
  trimRequest.body,
  verifyUser,
  OrderMiddleware.validateOrdeCheckout,
  OrderController.checkoutOrders
);

export default router;
