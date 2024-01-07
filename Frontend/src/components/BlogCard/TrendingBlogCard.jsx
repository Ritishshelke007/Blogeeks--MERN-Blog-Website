import React from "react";
import { Link } from "react-router-dom";

const TrendingBlogCard = ({ blog, index }) => {
  let {
    title,
    blog_id: id,
    author: {
      personal_info: { fullname, username, profile_img },
    },
    publishedAt,
  } = blog;

  let date = new Date(publishedAt);
  return (
    <Link to={`/blog/${id}`} className="flex gap-5 mb-8 ">
      <h1 className="blog-index"> {index < 10 ? "0" + (index + 1) : index} </h1>
      <div>
        <div className="flex gap-2 items-center mb-7">
          <img
            src={profile_img}
            alt="Profile"
            className="w-6 h-6 rounded-full"
          />
          <div className="flex flex-col">
            <p> {fullname} </p>
            <div className="flex justify-between items-center leading-none text-sm space-x-1">
              <p> @ {username} </p>
              <p>·</p>
              <p>
                {date.toLocaleString("default", {
                  month: "short",
                  day: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        <h1 className="blog-title"> {title} </h1>
      </div>
    </Link>
  );
};

export default TrendingBlogCard;
