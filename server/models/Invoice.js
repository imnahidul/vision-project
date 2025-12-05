import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema ({
  inv: {type: String, required: true},
  name:{type: String, required: true},
  due_date:{type: String, required: true},
  amount:{type: String, required: true},
  paid:{type: String, required: true},
  amount_due:{type: String, required: true},
  descriptions:{type: String, required: true},
  status:{type: String, required: true},

//createdAt:{type: Date, default: Date.now},

});


const InvoiceModel = mongoose.model("Invoice", invoiceSchema);

export default InvoiceModel;