import mongoose, { Schema, Document, model, Model } from "mongoose";

export interface Login extends Document{
  name: string,
  email: string, 
  password: string
}

const loginSchema = new Schema<Login>({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
})

const LoginModel: Model<Login> = mongoose.models.User || mongoose.model("User", loginSchema);

export default LoginModel;