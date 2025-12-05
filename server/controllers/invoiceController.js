import Invoice from '../models/Invoice.js';


 const addInvoice = async (req, res) => {

   try{
    const {inv,name, due_date,amount, paid,amount_due,descriptions,status} = req.body;
//      // if the Supplier already exist
     const existingInvoice = await Invoice.findOne({name});
    if (existingInvoice){
       return res.status(400).json({ success: false, message:'Invoice already exists'}); 
     }
//     //Create a new category
     const newInvoice = new Invoice({
      inv,
      name,
      due_date,
      amount,
      paid,
      amount_due,
      descriptions,
      status

    });
     await newInvoice.save();
     return res.status(201).json({ success: true, message:'Invoice added successfully'});
   }  catch (error) {
     console.error("Error adding invoice : ",error);
    return res.status(500).json({success: false, message:'Server error'});
  }
}
const getInvoices = async (req, res) => {
  try{
    const invoices = await Invoice.find();
    return res.status(200).json({success: true, invoices});
   } catch(error){
    console.error('Error fetching invoices:',error);
    return res.status(500).json({success:false, message:'Server error in getting invoices'});
   }
 }

 // // update Invoice start from here

const updateInvoice = async (req, res) => {
  try{
    const {id} = req.params;
   const {inv,name, due_date,amount, paid,amount_due,descriptions,status} = req.body;
    // check if Invoice exists
      const existingInvoice = await Invoice.findById(id);
      if(!existingInvoice) {
     return res.status(404).json({ success: false, message: "Invoice not found"});
    }
    const updateInvoice = await Invoice.findByIdAndUpdate(
     id,
    {inv,name, due_date,amount, paid,amount_due,descriptions,status},
    {new: true}
   );
    return res.status(200).json({success: true, message: "Invoice Updated successfully" });
   } catch(error){
    console.error("Error updating Invoice: ",error);
  return res.status(500).json({success: false, message: "server error"});
  }
}

// Delete Invoice start from here
 //  Invoices 
   // invoice
   // Invoice

const deleteInvoice = async (req, res) => {
  try{
   const {id} = req.params;
   // check if Invoice exists
     const existingInvoice = await Invoice.findById(id);
      if(!existingInvoice) {
    return res.status(404).json({ success: false, message: "Invoice not found"});
   }
    await Invoice.findByIdAndDelete(id);
   return res.status(200),json({success: true, message: "Invoice Deleted successfully" });
  } catch(error){
    console.error("Error deleting Invoice: ",error);
  return res.status(500).json({success: false, message: "server error"});
  }
}

export   {addInvoice,getInvoices,updateInvoice,deleteInvoice};