import AddressCard from "./AddressCard";

export default function AddressesList({
  addresses,
  error,
  isError,
  isLoading,
  onSetAddressId,
}) {
  let content;

  if (isLoading) {
    content = <span className="loading loading-spinner loading-lg"></span>;
  } else if (isError) {
    content = <div>Error: {error}</div>;
  } else if (addresses.length === 0) {
    content = (
      <p className="text-cyan-500 font-noto text-lg tracking-wide bg-sky-950 p-8 rounded-xl max-w-2xl mx-auto">
        No addresses added Yet! <br></br> Please add address to checkout your
        items...
      </p>
    );
  } else {
    content = (
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {addresses.map((address) => (
          <AddressCard
            key={address._id}
            address={address}
            onSetAddressId={onSetAddressId}
          />
        ))}
      </ul>
    );
  }

  return <div className="my-5">{content}</div>;
}
