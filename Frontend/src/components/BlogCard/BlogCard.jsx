import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ content, author }) => {
  let {
    title,
    banner,
    des,
    publishedAt,
    tags,
    activity: { total_likes, total_reads },
    blog_id: id,
  } = content;

  let { fullname, profile_img, username } = author;

  let date = new Date(publishedAt);

  return (
    <Link to={`/blog/${id}`} className="">
      <div className="w-full p-5 mb-7 space-y-4 border border-slate300  rounded-lg">
        <div className="flex gap-2 items-center">
          <div>
            <img
              src={profile_img}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div>
            <p> {fullname} </p>
            <p className="space-x-1">
              <span className="hidden md:inline-block">@{username} </span>
              <span className="hidden md:inline-block">·</span>

              <span>
                {date.toLocaleString("default", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>

        <div className="flex md:flex-row flex-col justify-center items-center gap-8">
          <div>
            <p className="text-slate800 text-xl line-clamp-2 font-bold">
              {title}
            </p>
            <p className="text-slate500 line-clamp-2 text-lg">{des}</p>
          </div>
          <div>
            <div className="w-full overflow-hidden md:h-28  aspect-video bg-grey rounded-lg">
              <img
                src={banner}
                alt="blog banner"
                className="w-full h-full aspect-video object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center ">
          <div className="space-x-3">
            <span className="btn-light py-1 px-4"> {tags[0]} </span>
            <span>·</span>
            <span> {total_likes} likes </span>
            <span>·</span>
            <span> {total_reads} reads </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
