import { Schema, models, model } from "mongoose";

const promptSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: "String",
    required: [true, "Prompt is required"],
  },
  tag: {
    type: "String",
    required: [true, "Tag is required"],
  },
});
const Prompt = models.Prompt || model("Prompt", promptSchema);

export default Prompt;
