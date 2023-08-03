export default function CartItem({ name, price, quantity, onAdd, onRemove }) {
  return (
    <li className="border-b-2 border-gray-400/50 flex justify-between pb-3">
      <div className="flex flex-col justify-around">
        <h1 className="text-xl tracking-wide font-semibold font-noto md:text-2xl">{name}</h1>
        <div className="flex items-center gap-x-16 md:mt-4">
          <h3 className="text-xl font-semibold font-lunasima">₹{price}</h3>
          <div className="border border-gray-400 px-4 py-1 rounded-md">
            <span className="font-bold">x {quantity}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center md:flex-row md:gap-3">
        <button onClick={onRemove} className="mb-2 mt-2 text-3xl border border-orange-300 w-12 rounded-md hover:bg-orange-400 md:mt-0">
          -
        </button>
        <button onClick={onAdd} className="mb-2 text-3xl border border-orange-400 w-12 rounded-md hover:bg-orange-400">
          +
        </button>
      </div>
    </li>
  );
}
