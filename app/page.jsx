import AvailableMeals from "@components/Meals/AvailableMeals";
import MealsSummary from "@components/Meals/MealsSummary";

export default function Home() {
    return (
        <div className="mt-24">
            <MealsSummary />
            <AvailableMeals />
        </div>
    )
}