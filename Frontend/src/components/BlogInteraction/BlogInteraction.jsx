import React, { useContext } from "react";
import { BlogContext } from "../../pages/BlogPage";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { userContext } from "../../App";

const BlogInteraction = () => {
  let {
    blog: {
      title,
      blog_id,
      activity,
      activity: { total_likes, total_comments },
      author: {
        personal_info: { username: author_username },
      },
    },
    setBlog,
  } = useContext(BlogContext);

  let {
    userAuthContext: { username },
  } = useContext(userContext);
  return (
    <>
      <hr className="border-grey my-2" />
      <div className="flex gap-6 justify-between">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
            <AiOutlineHeart size={22} />
          </button>
          <p className="text-xl text-dark-grey"> {total_likes} </p>

          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
            <AiOutlineComment size={22} />
          </button>
          <p className="text-xl text-dark-grey"> {total_comments} </p>
        </div>

        <div className="flex items-center gap-6">
          {username == author_username ? (
            <Link
              to={`/editor/${blog_id}`}
              className="underline hover:text-purple"
            >
              Edit
            </Link>
          ) : (
            ""
          )}
          <Link
            to={`https://twitter.com/intent/tweet?text=Read ${title}&url=${location.href}`}
          >
            <FaXTwitter size={20} className="hover:text-twitter" />
          </Link>
        </div>
      </div>
      <hr className="border-grey my-2" />
    </>
  );
};

export default BlogInteraction;
