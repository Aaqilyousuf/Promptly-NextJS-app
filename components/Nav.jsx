"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useReducer } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [toggleHamBurger, setToggleHamBurger] = useState(false);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promtopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promtopia</p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create prompts
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    className="black_btn"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>
      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div>
            <button>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={() => setToggleHamBurger((prev) => !prev)}
              />
            </button>
            {toggleHamBurger && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleHamBurger(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleHamBurger(false)}
                >
                  Create prompts
                </Link>
                <button
                  type="button"
                  className="w-full mt-5 black_btn"
                  onClick={() => {
                    setToggleHamBurger(false);
                    signOut;
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
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type="button"
                    className="black_btn"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
