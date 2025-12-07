 import express from 'express';
 import { addCategory,getCategories, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import authMiddleware from '../middleware/authMiddleware.js';

 const router =express.Router();

 router.post('/add',authMiddleware, addCategory);
 //router.get('/',authMiddleware, getCategories);
 router.get('/', getCategories);
 //router.put('/:id',authMiddleware, updateCategory);
  router.put('/:id',authMiddleware, updateCategory);
  router.delete('/:id',authMiddleware, deleteCategory );


 export default router;