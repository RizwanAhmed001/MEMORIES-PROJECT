import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMemory extends Document {
  creator: string,
  title: string
  message: string,
  tags: string,
  image: string
}

const memoriesSchema = new Schema<IMemory>({
  creator: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  tags: { type: String, required: true },
  image: { type: String, required: true }
});

const MemoriesModel: Model<IMemory> = mongoose.models.Memory || mongoose.model("Memory", memoriesSchema)

export default MemoriesModel;