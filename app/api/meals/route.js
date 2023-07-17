import Meal from "@models/meals"
import { connectToDB } from "@utils/database";

export const GET = async () => {
  try {
    await connectToDB();

    const meals = await Meal.find({});

    return new Response(JSON.stringify(meals), { status: 200 });
  } catch (error) {
    return new Response("Failed to get Meals...", { status: 500 });
  }
};
