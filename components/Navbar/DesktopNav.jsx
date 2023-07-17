import Image from "next/image"
import Link from "next/link"

export default function DesktopNav({ session, signOut, signIn, providers, pathname }) {
    return (
        <div className="hidden md:flex md:pr-6">
        {session?.user ? (
          <div className="flex justify-center items-center gap-8">
            <Link
              href="/cart"
              className={`${
                pathname === "/cart" ? "underline underline-offset-4" : ""
              } text-lg text-white font-inter font-medium tracking-wide hover:underline underline-offset-4`}
            >
              Cart
            </Link>
            <Link
              href="/orders"
              className={`${
                pathname === "/orders" ? "underline underline-offset-4" : ""
              } text-lg text-white font-inter font-medium tracking-wide hover:underline underline-offset-4`}
            >
              Orders
            </Link>
            <button className="black_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt="Profile picture"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
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
    )
}