import Order from "@models/order";
import { connectToDB } from "@utils/database";

export const DELETE = async (req, { params }) => {
  console.log(params)
  try {
    await connectToDB();
    const result = await Order.findOneAndDelete({id: params.id} ,
      { new: true }
    );
   
    console.log(result)

    // await Order.findByIdAndRemove(params.id);

    return new Response("Order deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting order", { status: 500 });
  }
};
