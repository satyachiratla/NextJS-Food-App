export default function Skeleton({ index }) {
  return (
    <li className="border border-gray-600 animate-pulse text-white rounded-md bg-gray-900 p-6 flex justify-between items-center">
      <span className="py-8" style={{ animationDelay: `${index * 0.05}s`, animationDuration: "1s" }} />
    </li>
  );
}
