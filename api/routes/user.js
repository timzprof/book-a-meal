import express from 'express';
import userController from '../controllers/user';

const router = express.Router();

router.get('/menu/', userController.getMenus);

router.post('/orders', userController.orderMeal);

module.exports = router;
