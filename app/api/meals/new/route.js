import Meal from "@models/meals";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { name, description, price, image } = await req.json();

  try {
    await connectToDB();

    const newMeal = new Meal({ name, description, price, image });
    await newMeal.save();

    return new Response(JSON.stringify(newMeal), { status: 200 });
  } catch (error) {
    return new Response("Failed to add Meal!", { status: 500 });
  }
};

