import mongoose from "mongoose";
const dbconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to database", error);
  }
};
export default dbconnection;