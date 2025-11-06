import mongoose from "mongoose"

const connectDB = async() => {
 try {
    mongoose.connect(process.env.MONGO_URI!);
    console.log("Database Connected")
 } catch (error) {
    console.log("Something Went Wrong ", error)
    process.exit(1)
 }
}

export default connectDB;