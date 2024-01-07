import React, { useContext, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";
import { userContext } from "../../App";
import { PiBell } from "react-icons/pi";
import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import UserNavigationPanel from "../UserNavigationPanel/UserNavigationPanel";

const Navbar = () => {
  const [searchBoxVisible, setSearchBoxVisible] = useState(false);

  const [userNavPanel, setUserNavPanel] = useState(false);

  const navigate = useNavigate();

  const {
    userAuthContext,
    userAuthContext: { access_token, profile_img },
  } = useContext(userContext);

  const handleKeyDown = (e) => {
    let query = e.target.value;
    if (e.keyCode == 13 && query.length) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <nav className="z-10 sticky top-0 flex items-center gap-12 w-full px-[5vw] py-5 h-[70px] border-b border-grey bg-white">
        <Link to="/" className="text-2xl font-bold">
          <div>Blogeeks</div>
        </Link>

        <div
          className={`absolute bg-white top-full  w-full left-0 mt-0.5 border-b border-grey py-3 px-[5vw] md:relative  md:inset-0 md:border-none md:block md:p-0 md:show ease-in duration-100 md:w-auto ${
            searchBoxVisible ? "show" : "hide"
          }`}
        >
          <input
            type="text"
            name="searchtext"
            id="searchtext"
            placeholder="Search"
            className="w-full md:w-auto bg-grey p-3 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-gray-800 md:pl-14"
            onKeyDown={handleKeyDown}
          />

          <IoSearchOutline className="text-2xl text-dark-grey absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-3 md:gap-4 ml-auto">
          <button className="md:hidden bg-grey w-10 h-10 rounded-full flex items-center justify-center">
            <IoSearchOutline
              className="text-xl"
              onClick={() => setSearchBoxVisible(!searchBoxVisible)}
            />
          </button>

          <Link
            to="/editor"
            className="hidden md:flex items-center justify-center gap-2 link rounded-full"
          >
            <FaRegPenToSquare className="text-xl" />
            <p>Write</p>
          </Link>

          {access_token ? (
            <>
              <Link to="/dashboard/notification">
                <button className="w-10 h-10 rounded-full bg-grey flex items-center justify-center hover:bg-black/10">
                  <PiBell className="text-xl" />
                </button>
              </Link>

              <div
                className="relative"
                onClick={() => setUserNavPanel(!userNavPanel)}
                onMouseLeave={() => setUserNavPanel(false)}
              >
                <button className="w-10 h-10 flex justify-center items-center">
                  <img
                    src={profile_img}
                    className="w-full h-full object-cover rounded-full"
                    alt="Profile"
                  />
                </button>

                {userNavPanel && <UserNavigationPanel />}
              </div>
            </>
          ) : (
            <>
              <NavLink to="signin" className={"btn-light"}>
                Sign in
              </NavLink>
              <NavLink
                to="signup"
                className={({ isActive }) =>
                  ["hidden md:block", isActive ? "btn-light" : "btn-dark"].join(
                    " "
                  )
                }
              >
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
