import React, { useContext, useEffect } from "react";
import { BlogContext } from "../../pages/BlogPage";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { userContext } from "../../App";
import { IoHeartOutline } from "react-icons/io5";
import { Toaster, toast } from "react-hot-toast";
import { IoHeartSharp } from "react-icons/io5";
import axios from "axios";

const BlogInteraction = () => {
  let {
    blog,
    blog: {
      _id,
      title,
      blog_id,
      activity,
      activity: { total_likes, total_comments },
      author: {
        personal_info: { username: author_username },
      },
    },
    setBlog,
    isLiked,
    setIsLiked,
  } = useContext(BlogContext);

  let {
    userAuthContext: { username, access_token },
  } = useContext(userContext);

  useEffect(() => {
    if (access_token) {
      axios
        .post(
          import.meta.env.VITE_SERVER_DOMAIN + "/isliked-by-user",
          { _id },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then(({ data: { result } }) => {
          setIsLiked(Boolean(result));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleLike = () => {
    if (access_token) {
      setIsLiked((preVal) => !preVal);
      !isLiked ? total_likes++ : total_likes--;

      setBlog({ ...blog, activity: { ...activity, total_likes } });

      axios
        .post(
          import.meta.env.VITE_SERVER_DOMAIN + "/like-blog",
          {
            _id,
            isLiked,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Please login to like this blog");
    }
  };

  return (
    <>
      <Toaster />
      <hr className="border-grey my-2" />
      <div className="bottom-10 fixed left-0 right-0 z-50 flex h-12 w-full flex-wrap justify-center items-center bg-transparent">
        <div className="border border-dark-grey flex justify-center items-center bg-white rounded-full space-x-3 px-5">
          <button
            className={
              "w-10 h-10 rounded-full flex items-center justify-center " +
              (isLiked ? "text-red " : " bg-grey/80")
            }
            onClick={handleLike}
          >
            {isLiked ? (
              <IoHeartSharp size={25} />
            ) : (
              <IoHeartOutline size={25} />
            )}
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
        <div className="flex items-center gap-3">
          <button
            className={
              "w-10 h-10 rounded-full flex items-center justify-center " +
              (isLiked ? "text-red bg-red/20 " : " bg-grey/80")
            }
            onClick={handleLike}
          >
            {isLiked ? (
              <IoHeartSharp size={25} />
            ) : (
              <IoHeartOutline size={25} />
            )}
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
