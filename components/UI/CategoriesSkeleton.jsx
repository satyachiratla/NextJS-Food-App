export default function CategoriesSkeleton() {
  return (
    <div>
      <div className="skeleton h-32 w-80 bg-slate-700 p-4 space-y-6">
        <div className="skeleton h-8 bg-slate-800 mx-auto"></div>
        <div className="skeleton w-32 h-8 bg-slate-800 float-right"></div>
      </div>
    </div>
  );
}
