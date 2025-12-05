import { json } from 'express';
import Category from '../models/Category.js';
import ProductModel from '../models/Product.js';

const addCategory = async (req, res) => {

  try{
    const {categoryName, categoryDescription} = req.body;
     // if the category already exist
    const existingCategory = await Category.findOne({categoryName});
    if (existingCategory){
       return res.status(400).json({ success: false, message:'Category already exists'}); 
    }
    //Create a new category
    const newCategory = new Category({
     categoryName,
     categoryDescription
    });
    await newCategory.save();
    return res.status(201).json({ success: true, message:'Category added successfully'});
  }  catch (error) {
    console.error("Error adding category : ",error);
    return res.status(500).json({success: false, message:'Server error'});
  }
}

const getCategories = async (req, res) => {
  try{
    const categories = await Category.find();
    return res.status(200).json({success: true, categories});
  } catch(error){
    console.error('Error fetching categories:',error);
    return res.status(500).json({success:false, message:'Server error in getting categories'});
  }
}

// updateCategory start from here
const updateCategory = async (req, res) => {
  try{
   const {id} = req.params;
  const {categoryName , categoryDescription } =req.body;
   // check if category exists
     const existingCategory = await Category.findById(id);
      if(!existingCategory) {
    return res.status(404).json({ success: false, message: "Category not found"});
   }
   const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {categoryName, categoryDescription},
    {new: true}
   );
   return res.status(200),json({success: true, message: "Category Updated successfully" });
  } catch(error){
    console.error("Error updating category: ",error);
  return res.status(500).json({success: false, message: "server error"});
  }
}

// deleteCategory start from here
const deleteCategory = async (req, res) => {
  try{
   const {id} = req.params;
   
    // Associated part  start
      const productCount = await ProductModel.countDocuments({categoryId: id});
    if (productCount > 0) {
      return res.status(400).json({success: false, message:"can not delete category associated with products"});
    }
    // Associated part End
   // check if category exists
     const existingCategory = await Category.findById(id);
      if(!existingCategory) {
    return res.status(404).json({ success: false, message: "Category not found"});
   }
    await Category.findByIdAndDelete(id);
   return res.status(200),json({success: true, message: "Category Delete successfully" });
  } catch(error){
    console.error("Error deleting category: ",error);
  return res.status(500).json({success: false, message: "server error"});
  }
}







export   {addCategory, getCategories, updateCategory, deleteCategory};