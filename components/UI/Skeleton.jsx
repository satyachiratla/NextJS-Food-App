export default function Skeleton() {
  return (
    <div className="animate-pulse p-6 border border-gray-600 rounded-md bg-gray-900 flex flex-col justify-between md:flex-row ">
      <div className="">
        <h2 className="h-3 bg-gray-400 w-16 rounded-full mb-4" />
        <ul className="">
          {[1, 2].map((item, index) => (
            <li
              key={index}
              className="h-2.5 bg-gray-500 rounded-full w-56 mb-2"
            />
          ))}
        </ul>
        <p className="h-3 bg-gray-400 rounded-full w-28" />
      </div>
      <div className="hidden md:flex flex-col justify-between">
        <div>
          <h3 className="h-3 bg-gray-500 w-20 rounded-full mb-2" />
          <p className="h-2 bg-gray-400 w-16 rounded-full" />
        </div>
        <button className="rounded-full border border-black bg-gray-400 py-3 px-5 transition-all" />
      </div>
    </div>
  );
}
