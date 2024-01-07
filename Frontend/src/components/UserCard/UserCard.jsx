import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  let {
    personal_info: { fullname, username, profile_img },
  } = user;
  return (
    <Link to={`/user/${username}`} className="flex gap-5 items-center mb-5">
      <img src={profile_img} alt="Profile" className="w-10 h-10 rounded-full" />

      <div>
        <p className="font-medium text-lg line-clamp-2"> {fullname} </p>
        <p className="text-dark-grey"> @{username} </p>
      </div>
    </Link>
  );
};

export default UserCard;
