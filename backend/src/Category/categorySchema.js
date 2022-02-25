import mongoose from "mongoose";

const Category = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  links: [
    {
      address: {
        type: String,
        required: true,
        default: null,
      },
      information: {
        type: String,
        required: true,
        default: null,
      },
    },
  ],
});

export default mongoose.model("Category", Category);
