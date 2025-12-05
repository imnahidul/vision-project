import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
//import {getProducts, addProduct} from '../controllers/productController.js';
import {getProducts, addProduct, updateProduct,deleteProduct} from '../controllers/productController.js';
 const router =express.Router();


  router.get('/',authMiddleware, getProducts);
  router.post('/add',authMiddleware, addProduct);
  router.put('/:id',authMiddleware, updateProduct);
   router.delete('/:id',authMiddleware, deleteProduct );
//  router.get('/',authMiddleware, getCategories);
//  router.put('/:id',authMiddleware, updateCategory);
//  router.delete('/:id',authMiddleware, deleteCategory );




 export default router;