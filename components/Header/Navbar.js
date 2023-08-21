import { useState } from "react";
import { navbarData } from "./NavbarData";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "@/public/images/movix-logo.svg";
import Image from "next/image";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);

  const showNav = () => {
    setToggle(!toggle);
  };
  return (
    <nav className="fixed top-0 w-full bg-black items-center flex p-4 z-10">
      <div className="flex justify-between items-center w-full flex-wrap md:flex-nowrap">
        <Image className="" alt="" src={logo} />

        <AiOutlineMenu
          className="flex md:hidden cursor-pointer w-7 h-7 text-white"
          onClick={showNav}
        />

        <ul
          className={`${
            toggle ? " flex" : " hidden"
          } flex-col justify-center items-center w-full first:mt-2 md:flex-row md:w-auto md:space-x-10 md:flex`}
        >
          {navbarData.map((link, index) => {
            return (
              <li key={index} className={link.cname}>
                <Link
                  className="hover:text-pink-500 text-white"
                  href={"/"}
                  onClick={showNav}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          className={`${
            toggle ? " flex" : " hidden"
          } text-black hover:bg-pink-500 mx-auto md:mx-0 md:flex md:mt-0 items-center justify-center  bg-gray-100 px-1 p-2 rounded-lg mt-4 w-24 font-semibold`}
        >
          Login
        </button>
      </div>
    </nav>
  );
}
