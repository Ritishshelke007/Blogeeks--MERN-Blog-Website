import React, { useContext } from "react";
import AnimationWrapper from "../../common/page-animation";
import { NavLink } from "react-router-dom";
import { FaRegPenToSquare } from "react-icons/fa6";
import { userContext } from "../../App";
import { removeFromSession } from "../../common/sessions";

const UserNavigationPanel = () => {
  const {
    userAuthContext,
    userAuthContext: { username },
    setUserAuthContext,
  } = useContext(userContext);

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuthContext({ access_token: null });
  };

  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      className="absolute right-0 z-50"
    >
      <div className="bg-white absolute right-0 border border-grey duration-200 w-40">
        <NavLink to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
          <FaRegPenToSquare className="text-xl" />
          <p>Write</p>
        </NavLink>
        <NavLink to={`/user/${username}`} className="link pl-8 py-4">
          Profile
        </NavLink>
        <NavLink to="dashboard/blogs" className="link pl-8 py-4">
          Dashboard
        </NavLink>
        <NavLink to="settings" className="link pl-8 py-4">
          Settings
        </NavLink>

        <span className="absolute border-t border-grey w-[100%]"></span>

        <button
          className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
          onClick={signOutUser}
        >
          <h1 className="font-bold text-xl mt-1">Sign out</h1>
          <p className="text-dark-grey">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
