import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/Loader/Loader";
import { userContext } from "../App";
import AboutUser from "../components/AboutUser/AboutUser";
import BlogCard from "../components/BlogCard/BlogCard";
import NoDataMessage from "../components/NoDataMessage/NoDataMessage";
import MobileHomeNav from "../components/MobileHomeNavigation/MobileHomeNav";
import PageNotFound from "./404NotFound";

export const profileStructure = {
  personal_info: {
    fullname: "",
    username: "",
    profile_img: "",
    bio: "",
  },
  account_info: {
    total_posts: 0,
    total_reads: 0,
  },
  social_links: {},
  joinedAt: "",
};

const UserProfilePage = () => {
  let { id: profileId } = useParams();
  const [profile, setProfile] = useState(profileStructure);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState("");

  let {
    userAuthContext: { username },
  } = useContext(userContext);

  let {
    personal_info: { fullname, username: profile_username, profile_img, bio },
    account_info: { total_posts, total_reads },
    social_links,
    joinedAt,
  } = profile;

  const fetchUserProfile = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", {
        username: profileId,
      })
      .then(({ data: user }) => {
        if (user != null) {
          setProfile(user);
        }
        setProfileLoaded(profileId);
        getBlogs({ user_id: user._id });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const getBlogs = ({ page = 1, user_id }) => {
    user_id = user_id == undefined ? blogs.user_id : user_id;

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs-of-user", {
        author: user_id,
      })
      .then(({ data }) => {
        setBlogs(data);
      });
  };

  const resetStates = () => {
    setProfile(profileStructure);
    setBlogs(null);
    setLoading(true);
    setProfileLoaded("");
  };

  useEffect(() => {
    if (profileId != profileLoaded) {
      setBlogs(null);
    }

    if (blogs == null) {
      resetStates();
      fetchUserProfile();
    }
  }, [profileId, blogs]);

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : profile_username.length ? (
        <section className="h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12 ">
          <div className="flex flex-col max-md:items-center gap-3 min-w-[250px] md:w-[50%]  md:pl-8 md:border-l border-grey md:sticky md:top-[100px]">
            <img
              src={profile_img}
              alt="Profile image"
              className="w-32 h-32 bg-grey rounded-full md:w-32 md:h-32 border border-slate500"
            />
            <div className="flex flex-col justify-center items-center md:items-start">
              <p className="capitalize text-2xl font-medium"> {fullname} </p>
              <h1 className="h-6 text-lg text-dark-grey">
                @{profile_username}{" "}
              </h1>
            </div>

            <div className="flex justify-center items-center gap-16 mt-5 md:justify-start">
              <div className="flex flex-col justify-center items-center">
                <div className="text-2xl font-medium">
                  {total_posts.toLocaleString()}
                </div>
                <div>Blogs</div>
              </div>
              <div className="flex justify-center items-center flex-col">
                <div className="text-2xl font-medium">
                  {total_reads.toLocaleString()}
                </div>
                <div>Reads</div>
              </div>
            </div>

            <div className="mt-5">
              {profileId == username ? (
                <Link
                  to="/settings/edit-profile"
                  className="rounded-md btn-dark"
                >
                  Edit Profile
                </Link>
              ) : (
                <button className="rounded-md btn-dark">Follow</button>
              )}
            </div>

            <AboutUser
              className={"max-md:hidden"}
              bio={bio}
              social_links={social_links}
              joinedAt={joinedAt}
            />
          </div>

          <div className="max-md:mt-12 w-full ">
            <MobileHomeNav
              routes={["Blogs Published", "About"]}
              defaultHidden={["About"]}
            >
              <>
                {blogs == null ? (
                  <Loader />
                ) : blogs.blogs.length ? (
                  blogs.blogs.map((blog, i) => {
                    return (
                      <AnimationWrapper
                        transition={{ duration: 1, delay: i * 0.1 }}
                        key={i}
                      >
                        <BlogCard
                          content={blog}
                          author={blog.author.personal_info}
                        />
                      </AnimationWrapper>
                    );
                  })
                ) : (
                  <NoDataMessage message="No Blogs in this category" />
                )}

                {/* <LoadMoreBtn state={blogs} fetchDataFun={getBlogs} /> */}
              </>

              <AboutUser
                bio={bio}
                social_links={social_links}
                joinedAt={joinedAt}
              />
            </MobileHomeNav>
          </div>
        </section>
      ) : (
        <PageNotFound />
      )}
    </AnimationWrapper>
  );
};

export default UserProfilePage;
