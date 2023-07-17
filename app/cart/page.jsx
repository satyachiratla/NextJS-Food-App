import Cart from "@components/Cart/Cart"

export const metadata = {
    title: "Cart",
    description: "Check out your items and place the order..."
}

export default function CartPage() {
    return (
        <section className="mt-36 w-full max-w-2xl">
            <h1 className="text-center text-sky-500 font-inter tracking-wider font-bold text-3xl md:text-4xl">Cart Items</h1>
            <Cart />
        </section>
    )
}