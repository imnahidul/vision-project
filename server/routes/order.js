import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addOrder, getOrders } from '../controllers/orderController.js';
 const router = express.Router();

 router.post('/add',authMiddleware, addOrder);
 router.get('/',authMiddleware, getOrders);
//  router.put('/:id',authMiddleware, updateSupplier);
//  router.delete('/:id',authMiddleware, deleteSupplier );

 export default router;