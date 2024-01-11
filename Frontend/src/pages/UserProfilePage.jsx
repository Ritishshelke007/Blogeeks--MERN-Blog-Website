import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/Loader/Loader";
import { userContext } from "../App";

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
        setLoading(false);
        setProfile(user);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <section className="h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12 ">
          <div className="flex flex-col max-md:items-center gap-5 min-w-[250px]">
            <img
              src={profile_img}
              alt="Profile image"
              className="w-40 h-40 bg-grey rounded-full md:w-32 md:h-32 border border-slate500"
            />
            <p className="capitalize  text-2xl font-medium"> {fullname} </p>
            <h1 className="h-6 text-xl"> @{profile_username} </h1>

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
          </div>
        </section>
      )}
    </AnimationWrapper>
  );
};

export default UserProfilePage;
