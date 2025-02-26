import AuthForm from "@components/Auth/AuthForm";
import AvailableMeals from "@components/Meals/AvailableMeals";
import Categories from "@components/Meals/Categories";
import MealsSummary from "@components/Meals/MealsSummary";

export default function Home() {
  return (
    <div className="mt-24">
      <MealsSummary />
      {/* <AvailableMeals /> */}
      <Categories />
      <AuthForm />
    </div>
  );
}
