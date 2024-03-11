import { Menu, User, LogIn } from "lucide-react";
import React from "react";
import ToggleTheme from "../ui/ToggleTheme";
import CustomToggleTheme from "../ui/CustomToggleTheme";
import Link from "next/link";

const Header = () => {
  return (
    <header className=" container p-4">
      <nav className=" fl-itc justify-between">
        <h1 className=" text-4xl font-bold">YOUR BRAND</h1>
        <ul className=" fl-itc gap-8">
          <li>Penginapan</li>
          <li>Penginapan</li>
          <li>Penginapan</li>
        </ul>
        <div className="fl-itc gap-4">
          <div className="fl-itc p-2 rounded-3xl gap-2">
            <Menu />
            <User />
            <Link href="/auth">
              <LogIn />
            </Link>
          </div>
          <CustomToggleTheme />
        </div>
      </nav>
    </header>
  );
};

export default Header;
