import Image from "next/image";
import Link from "next/link";

export default function MobileNav({ session, setToggle, toggleHandler, signOut, signIn, providers, toggle }) {
    return (
        <div className="md:hidden relative ">
        {session?.user ? (
          <div>
            <Image
              src={session?.user.image}
              alt="logo"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggle((prev) => !prev)}
            />
            {toggle && (
              <div className="dropdown">
                <Link
                  href="/cart"
                  className="dropdown_link"
                  onClick={toggleHandler}
                >
                  Cart
                </Link>
                <Link
                  href="/orders"
                  className="dropdown_link"
                  onClick={toggleHandler}
                >
                  Orders
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggle(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
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