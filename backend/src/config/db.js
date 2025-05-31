import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
   
   await  mongoose.connect(process.env.MONGO_URI);
   console.log("mongodb connected successfully");
     
  } catch (error) {
    console.error('MongodB connection error:', error);
    process.exit(1); // Exit the process with failure  &&& 0  means exit with success

  }
}
export default connectDB;