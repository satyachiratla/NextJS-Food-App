import Order from "@models/order";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const orders = await Order.find({ creator: params.id }).sort({ date: 'desc' }).populate({
      path: "creator",
      model: "User",
    });
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all orders", { status: 500 });
  }
};

