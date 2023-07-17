import Meals from "./Meals";

export default function AvailableMeals() {
  return (
    <div className="mt-10 md:mt-16 mx-auto">
      <h1 className=" text-center font-hind font-bold text-amber-700 text-[1.8rem] tracking-wide md:text-3xl">
        Available Meals
      </h1>
      <Meals />
    </div>
  );
}
