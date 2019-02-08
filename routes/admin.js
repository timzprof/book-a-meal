import express from 'express';
import adminController from '../controllers/admin';

const router = express.Router();

router.get('/meals/', adminController.getMealOptions);

router.post('/meals/', adminController.addMealOption);

module.exports = router;
