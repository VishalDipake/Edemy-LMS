import mongoose from "mongoose";

//Connect to mongoDb

const connectDB = async () => {
  mongoose.connection.on('connected', () => console.log('DataBase Connected'))

  await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
}

export default connectDB