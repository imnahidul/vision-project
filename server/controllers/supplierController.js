import Supplier from '../models/Supplier.js'; 

const addSupplier = async (req, res) => {

  try{
    const {name,email,number,address} = req.body;
     // if the Supplier already exist
    const existingSupplier = await Supplier.findOne({name});
    if (existingSupplier){
       return res.status(400).json({ success: false, message:'Supplier already exists'}); 
    }
    //Create a new category
    const newSupplier = new Supplier({
     name,
     email,
     number,
     address

    });
    await newSupplier.save();
    return res.status(201).json({ success: true, message:'Supplier added successfully'});
  }  catch (error) {
    console.error("Error adding supplier : ",error);
    return res.status(500).json({success: false, message:'Server error'});
  }
}

const getSuppliers = async (req, res) => {
  try{
    const suppliers = await Supplier.find();
    return res.status(200).json({success: true, suppliers});
   } catch(error){
    console.error('Error fetching suppliers:',error);
    return res.status(500).json({success:false, message:'Server error in getting suppliers'});
   }
 }

// // updateCategory start from here
const updateSupplier = async (req, res) => {
  try{
    const {id} = req.params;
   const {name, email, number, address } = req.body;
    // check if category exists
      const existingSupplier = await Supplier.findById(id);
      if(!existingSupplier) {
     return res.status(404).json({ success: false, message: "Supplier not found"});
    }
    const updateSupplier = await Supplier.findByIdAndUpdate(
     id,
    {name, email, number, address},
    {new: true}
   );
    return res.status(200).json({success: true, message: "Supplier Updated successfully" });
   } catch(error){
    console.error("Error updating supplier: ",error);
  return res.status(500).json({success: false, message: "server error"});
  }
}

// deleteSupplier start from here

const deleteSupplier = async (req, res) => {
  try{
   const {id} = req.params;
   // check if Supplier exists
     const existingSupplier = await Supplier.findById(id);
      if(!existingSupplier) {
    return res.status(404).json({ success: false, message: "Supplier not found"});
   }
    await Supplier.findByIdAndDelete(id);
   return res.status(200),json({success: true, message: "Supplier Deleted successfully" });
  } catch(error){
    console.error("Error deleting supplier: ",error);
  return res.status(500).json({success: false, message: "server error"});
  }
}







export   {addSupplier, getSuppliers, updateSupplier, deleteSupplier };