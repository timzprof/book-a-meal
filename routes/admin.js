import express from 'express';
import adminController from '../controllers/admin';

const router = express.Router();

router.get('/meals/', adminController.getMealOptions);

router.post('/meals/', adminController.addMealOption);

router.put('/meals/:id', adminController.updateMealOption);

module.exports = router;
