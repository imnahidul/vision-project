import express from 'express';
import cors from 'cors';
import connectDB from './db/connection.js';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import SupplierRoutes from './routes/supplier.js';
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';
import dashboardRoutes from './routes/dashboard.js'
import invoiceRoutes from './routes/invoice.js'
import estimateRoutes from "./routes/estimate.js";
//import requisitionRoutes from "./routes/requisition.js";

const app = express();
app.use(cors());
// const allowedOrigin = 'http://localhost:5173/'; //  Replace with your actual frontend URL

// // Configuration options
// const corsOptions = {
//   origin: allowedOrigin,
//   // Optional: Add other options for security/functionality
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//   credentials: true, // Allow cookies/session headers
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
// };

// app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/supplier',SupplierRoutes);
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/dashboard',dashboardRoutes);
app.use('/api/invoice',invoiceRoutes);
app.use("/api/estimate", estimateRoutes);
//app.use("/api/requisition", requisitionRoutes);

app.get('/', (req, res) => {
  res.send('Read to server')
})


app.listen(process.env.PORT, () =>{
connectDB();
    console.log('server is running on http://localhost:3000');
}
)



///////after connect with mongo atlas 6-12-25////////////////

// import express from 'express';
// import cors from 'cors';
// import connectDB from './db/connection.js';
// import authRoutes from './routes/auth.js';
// import categoryRoutes from './routes/category.js';
// import SupplierRoutes from './routes/supplier.js';
// import productRoutes from './routes/product.js';
// import userRoutes from './routes/user.js';
// import orderRoutes from './routes/order.js';
// import dashboardRoutes from './routes/dashboard.js'
// import invoiceRoutes from './routes/invoice.js'
// import estimateRoutes from "./routes/estimate.js";
// //import requisitionRoutes from "./routes/requisition.js";

// const app = express();
// //app.use(cors());
//  app.use(cors({
//   origin: "https://vision-project-3ntg.vercel.app", // your frontend origin
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"], // important!
// }));

// // app.use(cors(corsOptions));
// app.use(express.json());
// app.use('/api/auth',authRoutes);
// app.use('/api/category',categoryRoutes);
// app.use('/api/supplier',SupplierRoutes);
// app.use('/api/products',productRoutes);
// app.use('/api/users',userRoutes);
// app.use('/api/orders',orderRoutes);
// app.use('/api/dashboard',dashboardRoutes);
// app.use('/api/invoice',invoiceRoutes);
// app.use("/api/estimate", estimateRoutes);
// //app.use("/api/requisition", requisitionRoutes);

// app.get('/', (req, res) => {
//   res.send('Read to server')
// })


// // app.listen(process.env.PORT, () =>{
// // connectDB();
// //     console.log('server is running on http://localhost:3000');
// // }
// // )

// // Fixed port + DB connection
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, async () => {
//   await connectDB();                          
//   console.log(`Server running on http://localhost:${PORT}`);
//   console.log('MongoDB  Connected!');
// });