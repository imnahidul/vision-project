import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
//import { addSupplier, getSuppliers,updateSupplier, deleteSupplier} from '../controllers/supplierController.js';
import { addInvoice,getInvoices ,updateInvoice,deleteInvoice } from '../controllers/invoiceController.js';
 const router = express.Router();

  router.post('/add',authMiddleware, addInvoice);
  router.get('/',authMiddleware, getInvoices);
  router.put('/:id',authMiddleware, updateInvoice);
  router.delete('/:id',authMiddleware, deleteInvoice );
//  router.put('/:id',authMiddleware, updateSupplier);
//  router.delete('/:id',authMiddleware, deleteSupplier);



 export default router;