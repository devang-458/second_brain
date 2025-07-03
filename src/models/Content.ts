import mongoose, { Schema } from "mongoose";

const ContentSchema = new mongoose.Schema({
  link: String,
  type: { type: String, enum: ["text", "link", "note"], required: true },
  title: String,
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.Content ||
  mongoose.model("Content", ContentSchema);
