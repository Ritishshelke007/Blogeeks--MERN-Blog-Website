import React, { useContext } from "react";
import { BlogContext } from "../../pages/BlogPage";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { userContext } from "../../App";
import { CiHeart } from "react-icons/ci";

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
      <div className="bottom-10 fixed left-0 right-0 z-50 flex h-12 w-full flex-wrap justify-center items-center bg-transparent">
        <div className="border border-dark-grey flex justify-center items-center bg-white rounded-full space-x-3 px-5">
          <button className="w-10 h-10 rounded-full flex items-center justify-center ">
            <AiOutlineHeart size={25} />
          </button>

          <div className="h-5 bg-black/60 w-[1px]"></div>

          <button className="w-10 h-10 rounded-full flex items-center justify-center ">
            <AiOutlineComment size={25} />
          </button>

          <div className="h-5 bg-black/60 w-[1px]"></div>

          <div className="flex justify-center items-center w-10 h-10">
            <Link
              to={`https://twitter.com/intent/tweet?text=Read ${title}&url=${location.href}`}
              target="_blank"
            >
              <FaXTwitter size={20} className="hover:text-twitter" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-6 justify-between">
        {/* <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
            <AiOutlineHeart size={22} />
          </button>
          <p className="text-xl text-dark-grey"> {total_likes} </p>

          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
            <AiOutlineComment size={22} />
          </button>
          <p className="text-xl text-dark-grey"> {total_comments} </p>
        </div> */}

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
            target="_blank"
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
