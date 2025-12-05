import Supplier from '../models/Supplier.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';


const addProduct = async (req, res) => {

  try{
    const {name,description,price,stock,categoryId,supplierId} = req.body;
  
    //Create a new product
    const newProduct = new Product({
              name ,
              description,
              price,
              stock,
              categoryId,
              supplierId  

    });
    await newProduct.save();
    return res.status(201).json({ success: true, message:'Product added successfully'});
  }  catch (error) {
    console.error("Error adding product : ",error);
    return res.status(500).json({success: false, message:'Server error'});
  }
}

const getProducts = async (req, res) => {
  try{
    const products = await Product.find({isDeleted: false}).populate('categoryId').populate('supplierId');
    //const products = await Product.find();
    const suppliers = await Supplier.find();
    const categories = await Category.find();
    return res.status(200).json({success: true, products, suppliers, categories});
   } catch(error){
    console.error('Error fetching suppliers:',error);
    return res.status(500).json({success:false, message:'Server error in getting suppliers'});
     }
 }
    
    // // updateProduct start from here
// const updateProduct = async (req, res) => {
//   try{
//     const {id} = req.params;
//    const {name,description,price,stock,categoryId,supplierId } = req.body;
//     // check if category exists
//       const existingProduct = await Supplier.findById(id);
//       if(!existingProduct) {
//      return res.status(404).json({ success: false, message: "Product not found"});
//     }
//     const updateProduct = await Product.findByIdAndUpdate(
//      id,
//     {name, email, number, address},
//     {new: true}
//    );
//     return res.status(200),json({success: true, message: "Product Updated successfully" });
//    } catch(error){
//     console.error("Error updating Product: ",error);
//   return res.status(500).json({success: false, message: "server error"});
//   }
// }

    // // updateProduct  Manual code start

const updateProduct = async (req, res) => {
  try{
    const {id} = req.params;
   const {name,description,price,stock,categoryId,supplierId } = req.body;
    // // updateProduct
    const updatedProduct = await Product.findByIdAndUpdate(
         id,
             {name ,
              description,
              price,
              stock,
              categoryId,
              supplierId  },
    {new: true});
    if(!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found"});
    }
    return res.status(200).json({success: true, message: "Product Updated successfully",product: updatedProduct });
    } catch(error){
    console.error("Error updating Product: ",error);
   return res.status(500).json({success: false, message: "server error"});
 }
}

// // deleteProduct start from here
const deleteProduct = async (req, res) => {
  try{
   const {id} = req.params;
   // check if Supplier exists
     const existingProduct = await Product.findById(id);
      if(!existingProduct) {
    return res.status(404).json({ success: false, message: "Product not found"});
   }
    //await Product.findByIdAndDelete(id);
    if(existingProduct.isDeleted){
     return res.status(400).json({ success: false, message: "Product Already Deleted"});
    }
    await Product.findByIdAndUpdate(id,{isDeleted : true}, {new: true});
   return res.status(200).json({success: true, message: "products Deleted successfully" });
  } catch(error){
    console.error("Error deleting product: ",error);
  return res.status(500).json({success: false, message: "server error"});
  }
}

  

 export{getProducts, addProduct, updateProduct,deleteProduct};
 //export{getProducts, addProduct};