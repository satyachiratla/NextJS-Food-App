import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    user: [],
    orderedItems: [],
    date: {
        type: Date,
        default: Date.now()
    }
})

const Order = models.Order || model("Order", OrderSchema);

export default Order;
