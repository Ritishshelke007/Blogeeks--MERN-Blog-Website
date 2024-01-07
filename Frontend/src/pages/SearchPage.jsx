import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MobileHomeNav from "../components/MobileHomeNavigation/MobileHomeNav";
import Loader from "../components/Loader/Loader";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";
import AnimationWrapper from "../common/page-animation";
import BlogCard from "../components/BlogCard/BlogCard";
import NoDataMessage from "../components/NoDataMessage/NoDataMessage";
import axios from "axios";
import filterPaginationData from "../common/filterPaginationData";
import UserCardWrapper from "../components/UserCard/UserCardWrapper";
import { FaRegUser } from "react-icons/fa";

const SearchPage = () => {
  let { query } = useParams();
  const [blogs, setBlogs] = useState(null);
  const [users, setUsers] = useState(null);

  const searchBlogs = ({ page = 1, create_new_arr = false }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        query,
        page,
      })
      .then(async ({ data }) => {
        let formatedData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/search-blogs-count",
          data_to_send: { query },
          create_new_arr,
        });
        setBlogs(formatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUsers = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-users", { query })
      .then(({ data: { users } }) => {
        setUsers(users);
      });
  };

  useEffect(() => {
    resetState();
    searchBlogs({ page: 1, create_new_arr: true });
    fetchUsers();
  }, [query]);

  const resetState = () => {
    setBlogs(null);
    setUsers(null);
  };

  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <MobileHomeNav
          routes={[`Search results for "${query}"`, "User accounts matched"]}
          defaultHidden={["User accounts matched"]}
        >
          <>
            {blogs == null ? (
              <Loader />
            ) : blogs.results.length ? (
              blogs.results.map((blog, i) => {
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
            <LoadMoreBtn state={blogs} fetchDataFun={searchBlogs} />
          </>
          <UserCardWrapper users={users} />
        </MobileHomeNav>
      </div>

      <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
        <div className="flex justify-center items-center space-x-2 mb-10">
          <p className="font-medium text-xl">Users related to search</p>
          <FaRegUser className="text-xl" />
        </div>
        <div>
          <UserCardWrapper users={users} />
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
