import Logo from "../assets/apple.svg?react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import DarkToggle from "./DarkToggle";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchEnable, setIsSearchEnable] = useState(false);

  return (
    <nav
      className="
    flex items-center 
    justify-between px-4 h-16 
    shadow-md sticky top-0 
    z-50 bg-apple-light
    dark:bg-apple-dark 
    backdrop-blur-md"
    >
      <a href="#" className="text-xl font-bold">
        <Logo
          className="w-6 h-6
        hover:scale-105 
        transition-transform
      dark:fill-white
        "
        />
      </a>
      <div
        className="gap-6 
      hidden 
      md:flex mx-auto
      text-apple-text-light
      dark:text-apple-text-dark
      "
      >
        <a href="#">商店</a>
        <a href="#">电脑</a>
        <a href="#">手机</a>
        <a href="#">智能家居</a>
        <a href="#">娱乐</a>
        <a href="#">技术支持</a>
      </div>
      {isSearchEnable && (
        <div>
          <input
            className="
            peer
            border
           border-apple-gray-200
           px-4 py-2 w-64
           rounded-lg focus:outline-none 
           focus:ring-apple-blue
           transition
           "
          />
          <label
            className="
          absolute left-2 top-2
          peer-focus:-top-2
          peer-focus:text-xs
          peer-focus:text-apple-blue
          transition
          text-apple-text-light
          dark:text-apple-text-dark
          "
          >
            搜索
          </label>
        </div>
      )}

      <div
        className="gap-2
      text-apple-text-light
      dark:text-apple-text-dark
      dark:text-white
        space-x-2
      "
      >
        <button onClick={() => setIsSearchEnable(!isSearchEnable)}>
          <AiOutlineSearch size={24} />
        </button>
        <DarkToggle />
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <AiOutlineMenu size={24} />
        </button>
      </div>

      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 ${!isOpen && "hidden"}`}
      >
        <div
          className="flex flex-col 
        mt-17 space-y-6 
        bg-apple-light 
        dark:bg-apple-dark
        shadow-apple-md
        text-center 
        p-6 
        rounded-lg
        text-apple-text-light
        dark:text-apple-text-dark
        "
        >
          <a href="#">商店</a>
          <a href="#">电脑</a>
          <a href="#">手机</a>
          <a href="#">智能家居</a>
          <a href="#">娱乐</a>
          <a href="#">技术支持</a>
        </div>
      </div>
      {isOpen && (
        <div
          className="
           fixed inset-0
           bg-apple-black/50
           dark:bg-apple-white/10
            backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Header;
