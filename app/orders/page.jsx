import Orders from "@components/Orders/Orders";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Your Orders",
  description: "Check out your previous orders..."
}

export default function CartPage() {
  return (
    <section className="mt-32 w-full max-w-7xl">
      <h1 className="text-center text-sky-500 font-inter tracking-wider font-bold text-3xl md:text-4xl">
        Your Orders
      </h1>
      <Toaster />
      <Orders />
    </section>
  );
}
