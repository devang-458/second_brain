import mongoose, { model, Schema } from "mongoose";

 const LinkSchema = new mongoose.Schema({
  hash: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});


export default mongoose.models.Link || mongoose.model("Link", LinkSchema)