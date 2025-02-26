export default function MealsSkeleton() {
  return (
    <div className="flex w-52 flex-col gap-4 bg-slate-700 p-4">
      <div className="skeleton h-32 w-full bg-slate-800"></div>
      <div className="skeleton h-4 w-28 bg-slate-800"></div>
      <div className="skeleton h-4 w-full bg-slate-800"></div>
      <div className="skeleton h-4 w-full bg-slate-800"></div>
    </div>
  );
}
