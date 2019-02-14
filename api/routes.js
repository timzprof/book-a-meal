import express from 'express';
import trimRequest from 'trim-request';
import UserMiddleware from './middleware/user';
import CatererMiddleware from './middleware/caterer';
import AuthController from './controllers/auth';
import MealController from './controllers/meals';
import MenuController from './controllers/menu';
import OrderController from './controllers/orders';
import UserController from './controllers/user';
import CatererController from './controllers/caterer';

const router = express.Router();

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

router.get('/meals/', MealController.getMealOptions);

router.post('/meals/', MealController.addMealOption);

router.put('/meals/:id', MealController.updateMealOption);

router.delete('/meals/:id', MealController.deleteMealOption);

router.post('/menu/', MenuController.addMealToMenu);

router.get('/menu/', MenuController.getMenus);

router.get('/orders', OrderController.getOrders);

router.post('/orders', OrderController.orderMeal);

router.put('/orders/:orderId', OrderController.modifyOrder);

export default router;
