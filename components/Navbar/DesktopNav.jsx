import Image from "next/image";
import Link from "next/link";

export default function DesktopNav({
  session,
  signOut,
  signIn,
  providers,
  pathname,
  items
}) {

  return (
    <div className="hidden md:flex md:pr-6">
      {session?.user ? (
        <div className="flex justify-center items-center gap-8">
          <Link
            href="/cart"
            className={`${
              pathname === "/cart" ? "nav-active" : ""
            } nav`}
          >
            Cart <span className="text-white bg-amber-700 rounded-full px-1">{items.length}</span>
          </Link>
          <Link
            href="/orders"
            className={`${
              pathname === "/orders" ? "nav-active" : ""
            } nav`}
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
