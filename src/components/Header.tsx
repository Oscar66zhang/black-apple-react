import Logo from "../assets/apple.svg?react";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShopping,
} from "react-icons/ai";
import { useState, useContext, useEffect, useRef } from "react";
import DarkToggle from "./DarkToggle";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SHOPPING_PAGES } from "../assets/data/path";
import { ShoppingCartContext } from "@/contexts/shoppingCart";
import { AnimatePresence, motion } from "framer-motion";
import { IoLanguageOutline } from "react-icons/io5";
import store, { RootState } from "@/redux/store";
import { languageSet, CultureCode } from "@/redux/i18nReducer";
import { setCulture } from "@/redux/i18nSlice";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { AUTH_PAGES } from "../assets/data/path";
import { parseJwt } from "../helpers/jwtHelper";

const Header = () => {
  const [username, setUsername] = useState<string | null>(null);
  const { t } = useTranslation();
  const currentLanguage = useSelector<RootState, CultureCode>(
    (state: any) => state.i18n.currentLanguage,
  );

  console.log("currentLanguage:", currentLanguage);
  const dispatch = useDispatch();

  const { cartItems } = useContext(ShoppingCartContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchEnable, setIsSearchEnable] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) {
        navigate(`/search?query=${encodeURIComponent(query)}`);
        setQuery("");
      }
    }
  };

  //HTMLInputElement | null
  const inputRef = useRef<HTMLInputElement | null>(null);

  //ref
  useEffect(() => {
    console.log("inputRef.current", inputRef.current);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchEnable]);

  const handleLanguageChange = () => {
    const currentIndex = languageSet.indexOf(currentLanguage);
    const newIndex = (currentIndex + 1) % languageSet.length;
    const nextLanguage = languageSet[newIndex];
    store.dispatch(setCulture(nextLanguage));
    dispatch(setCulture(nextLanguage));
    console.log("Dispatched language change to:", nextLanguage);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      //解析token
      const decode = parseJwt(token);
      console.log("decode jwt:", decode);
      if (decode && decode.name) {
        setUsername(decode.name);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    navigate("/auth/signin");
  };

  return (
    <nav
      className="flex items-center justify-between px-4 h-16  sticky top-0 z-50 
      bg-apple-light
      dark:bg-apple-dark 
      shadow-apple-md
      backdrop-blur-md"
    >
      <a href="#" className="text-xl font-bold">
        <Logo className="w-6 h-6 hover:scale-105 transition-transform dark:fill-white" />
      </a>
      <div
        className="gap-6 hidden md:flex mx-auto
        text-apple-text-light
       dark:text-apple-text-dark"
      >
        {SHOPPING_PAGES.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            className={({ isActive }) => `
           hover:text-apple-blue ${
             isActive
               ? "text-apple-blue font-extrabold"
               : "text-apple-text-light dark:text-apple-text-dark"
           }
        `}
          >
            {t(`routes.${page.id}`)}
          </NavLink>
        ))}
      </div>
      {isSearchEnable && (
        <div className="relative">
          <input
            ref={inputRef}
            className="peer border
           border-apple-gray-200 px-4 py-2 w-64 rounded-lg focus:outline-none focus:ring-2 
           focus:ring-apple-blue transition"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <label
            className="absolute left-2 top-2
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
        className="
        flex items-center
        gap-2 
        space-x-2"
      >
        <button onClick={() => setIsSearchEnable((prev) => !prev)}>
          <AiOutlineSearch size={24} />
        </button>
        <DarkToggle />
        <button onClick={handleLanguageChange}>
          <IoLanguageOutline size={24} />
        </button>
        <button onClick={() => navigate("/cart")} className="relative">
          <AiOutlineShopping size={24} />
          <AnimatePresence>
            {cartItems.length > 0 && (
              <motion.span
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2
              bg-apple-red text-white text-xs font-bold w-5 h-5 rounded-full
              flex items-center justify-center
              "
                key={cartItems.length} //让动画在数字变化时重新触发
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {cartItems.length}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {username ? (
          <>
            <span className="hidden md:block">{username}</span>
            <button
              className="hidden md:block hover: text-apple-blue"
              onClick={handleLogout}
            >
              登出
            </button>
          </>
        ) : (
          AUTH_PAGES.map((page) => (
            <NavLink
              key={page.id}
              to={page.path}
              className={({ isActive }) =>
                `hover:text-apple-blue hidden md:block ${
                  isActive
                    ? "text-apple-blue font-extrabold"
                    : "text-apple-text dark:text-apple-text-dark"
                }`
              }
            >
              {page.title}
            </NavLink>
          ))
        )}

        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <AiOutlineMenu size={24} />
        </button>
      </div>
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64
        ${!isOpen && "hidden"}
        `}
      >
        <div
          className="flex flex-col mt-17 space-y-6 
        bg-apple-light
        dark:bg-apple-dark
          shadow-apple-md 
          text-center p-6 rounded-lg 
        text-apple-text-light
        dark:text-apple-text-dark"
        >
          {SHOPPING_PAGES.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              className={({ isActive }) => `
            hover:text-apple-blue ${
              isActive
                ? "text-apple-blue font-extrabold"
                : "text-apple-text-light dark:text-apple-text-dark"
            }
          `}
              onClick={() => setIsOpen(false)}
            >
              {page.title}
            </NavLink>
          ))}
          <hr className="border-t border-gray-300" />
          {username ? (
            <>
              <span>{username}</span>
              <button className="hover:text-apple-blue" onClick={handleLogout}>
                登出
              </button>
            </>
          ) : (
            AUTH_PAGES.map((page) => (
              <NavLink
                key={page.id}
                to={page.path}
                className={({ isActive }) => `
              hover:text-apple-blue ${
                isActive
                  ? "text-apple-blue font-extrabold"
                  : "text-apple-text-light dark:text-apple-text-dark"
              }
              `}
              >
                {page.title}
              </NavLink>
            ))
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 
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
