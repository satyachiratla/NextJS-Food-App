import { Schema, model, models } from "mongoose";

const orderedItemSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'order' },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
});

const orderedUserSchema = new Schema({
  enteredName: { type: String, required: true },
  enteredAddress: { type: String, required: true },
  enteredLandmak: { type: String, required: true },
  enteredPincode: { type: String, required: true },
});

const OrderSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  //   user: { type: [orderedUserSchema], required: true },
  //   orderedItems: { type: [orderedItemSchema], required: true },
  user: [],
  orderedItems: [],
  totalAmount: { type: Number, required: true },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
