//import { json } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const addUser = async (req, res) => {

  try{
    const {name,email,password,address,role} = req.body;
     // if the user already exist
    const exUser = await User.findOne({email});
    if (exUser){
       return res.status(400).json({ success: false, message:'User already exists'}); 
    }
    //const hashedPassword = await User.hashPassword(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    //Create a New Users
    const newUser = new User({
     name,
     email,
     password: hashedPassword,
     address,
     role
    });
    await newUser.save();
    return res.status(201).json({ success: true, message:'User added successfully'});
  }  catch (error) {
    console.error("Error adding User : ",error);
    return res.status(500).json({success: false, message:'Server error'});
  }
}

const getUsers = async (req, res) => {
  try{
    const users = await User.find();
    return res.status(200).json({success: true, users});
  } catch(error){
    console.error('Error fetching Users:',error);
    return res.status(500).json({success:false, message:'Server error in getting Users'});
  }
}
//User existing data show here start 18-10-2025
const getUser = async (req, res) => {
  try {
    const userId =req.user._id;
    const user= await User.findById(userId).select('-password'); 
    if(!user) {
      return res.status(404).json({success: false, message: 'User not found' });
    }
    return res.status(200).json({success: true, user});
  }
  catch (error) {
    console.error('Error fetching User  Profile :',error);
    return res.status(500).json({success:false, message:'Server error in getting User profile'});
  }
}

//User existing data show here end 18-10-2025

//User profile update Start here

const updateUserProfile = async (req,res) => {
   
  try {
    const userId = req.user._id;
    const {name,email,address, password} = req.body;

    const updatedata = {name, email, address};
    
       if(password && password.trim() !== '') {
       const hashedPassword = await bcrypt.hash(password, 10);
       updatedata.password = hashedPassword;
    }
       
    const user = await User.findByIdAndUpdate(userId,updatedata, {new:true}).select('-password');
     if(!user) {
      return res.status(404).json({success: false, message: 'User not found' });
    }
    
    // //Face the user from Database start
    // const user= await User.findById(userId);
    // if(!user) {
    //   return res.status(404).json({success: false, message: 'User not found' });
    // }
    //  //Update user details
    // user.name = name || user.name;
    // user.email = email || user.email;
    // user.address = address || user.address;
    // await user.save();
    //  //Face the user from Database End

      return res.status(200).json({success: true, message:'Profile Update Successfully', user});
      } catch(error) {
    console.error("Error updating User: ",error);
  return res.status(500).json({success: false, message: "Server Error Updating Profile"});

    }
}
//User profile update End here



// deleteCategory start from here
const deleteUser = async (req, res) => {
  try{
   const {id} = req.params;
   // check if User exists
     const exUser = await User.findById(id);
      if(!exUser) {
    return res.status(404).json({ success: false, message: "User not found"});
   }
    await User.findByIdAndDelete(id);
   return res.status(200),json({success: true, message: "User Delete successfully" });
  } catch(error){
    console.error("Error deleting User: ",error);
  return res.status(500).json({success: false, message: "server error"});
  }
}


export   {addUser, getUsers, deleteUser, getUser, updateUserProfile};