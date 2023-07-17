export default function NoOrders({ ordersLength }) {

    let content;
    if (ordersLength) {
        content =  (
            <p className="mt-8 rounded-xl border border-gray-400 bg-teal-800 p-6 text-cyan-400 font-noto text-lg tracking-wide">
              No Orders placed Yet! <br /> Explore our menu and customize your order for
              a delightful dining experience.
            </p>
          );
    }
  return content
}
