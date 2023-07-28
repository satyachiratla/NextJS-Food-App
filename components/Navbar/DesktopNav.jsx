import Image from "next/image";
import Link from "next/link";

export default function DesktopNav({
  session,
  signOut,
  signIn,
  providers,
  pathname,
  items,
}) {
  return (
    <div className="hidden md:flex md:pr-6">
      {session?.user ? (
        <div className="flex justify-center items-center gap-8">
          <Link
            href="/cart"
            className={`${pathname === "/cart" ? "nav-active" : ""} nav`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            Cart{" "}
            <span className="bg-amber-600 text-white rounded-full px-1">
              {items.length}
            </span>
          </Link>
          <Link
            href="/orders"
            className={`${pathname === "/orders" ? "nav-active" : ""} nav`}
          >
            Orders
          </Link>
          <button className="black_btn" onClick={signOut}>
            Sign Out
          </button>
          <Image
            src={session?.user.image}
            alt="Profile picture"
            width={37}
            height={37}
            className="rounded-full"
          />
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
        </>
      )}
    </div>
  );
}
