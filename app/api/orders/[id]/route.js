import Order from "@models/order";
import { connectToDB } from "@utils/database";

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Order.findOneAndRemove(params.id)
    return new Response("Order deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting order", { status: 500 });
  }
};
