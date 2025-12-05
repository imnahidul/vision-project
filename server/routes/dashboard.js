import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getData } from '../controllers/dashboardController.js';
const router = express.Router();

 
 router.get('/',authMiddleware,getData);
//router.post('/add',authMiddleware, addOrder);
// router.put('/:id',authMiddleware, updateSupplier);
// router.delete('/:id',authMiddleware, deleteSupplier);


 export default router;