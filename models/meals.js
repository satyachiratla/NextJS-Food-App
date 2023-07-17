import { Schema, model, models } from "mongoose";

const MealsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});

const Meal = models.Meal || model("Meal", MealsSchema);

export default Meal;
