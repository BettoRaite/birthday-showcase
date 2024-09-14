"use client";
import Link from "next/link";
import { signOut, signInWithPopup } from "../actions/auth/actions";
import Image from "next/image";
import googleLogo from "@/app/assets/icons/google-logo.svg";
import { usePathname } from "next/navigation";

type NavbarProps = {
  isUserLogged: boolean;
};
export function Navbar({ isUserLogged }: NavbarProps) {
  async function handleSignOutClick() {
    await signOut();
  }
  async function handleSignInClick() {
    await signInWithPopup();
  }
  const pathname = usePathname();
  return (
    <nav className="h-20 flex justify-end p-4 px-8">
      <ul className="flex items-center gap-4 justify-end">
        {pathname !== "/" && (
          <li
            className="rounded-lg border-1
            px-2 py-2 shadow-lg hover:bg-sky-blue cursor-pointer text-sm hover:text-white font-bold transition-all duration-200"
          >
            <Link href={"/"}>На главную</Link>
          </li>
        )}
        <li>
          <button
            className="flex items-center gap-2 rounded-lg border-1
              px-2 py-2 shadow-lg hover:bg-sky-blue cursor-pointer text-sm hover:text-white font-bold transition-all duration-200"
            type="button"
            onClick={isUserLogged ? handleSignOutClick : handleSignInClick}
          >
            {isUserLogged ? "Выйти" : "Войти"}
            <Image
              className="mr-2"
              src={googleLogo}
              alt={`${isUserLogged ? "Выйти" : "Войти"}`}
              width={25}
              height={25}
            />
          </button>
        </li>
      </ul>
    </nav>
  );
}
