import Order from "@models/order";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { userId, user, orderedItems, date, totalAmount } = await req.json();

  try {
    await connectToDB();

    const newOrder = new Order({ creator: userId, user, orderedItems, date, totalAmount });
    await newOrder.save();

    return new Response(JSON.stringify(newOrder), { status: 200 });
  } catch (error) {
    return new Response("Failed to add Order!", { status: 500 });
  }
};
