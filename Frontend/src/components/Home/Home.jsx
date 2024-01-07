import React, { useEffect, useState } from "react";
import AnimationWrapper from "../../common/page-animation";
import MobileHomeNav from "../MobileHomeNavigation/MobileHomeNav";
import axios from "axios";
import Loader from "../Loader/Loader";
import BlogCard from "../BlogCard/BlogCard";
import TrendingBlogCard from "../BlogCard/TrendingBlogCard";
import { HiTrendingUp } from "react-icons/hi";
import { activeTab } from "../MobileHomeNavigation/MobileHomeNav";
import NoDataMessage from "../NoDataMessage/NoDataMessage";

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [trendingBlogs, setTrendingBlogs] = useState(null);
  const [pageState, setPageState] = useState("home");
  let categories = [
    "tech",
    "ai",
    "interview",
    "dsa",
    "programming",
    "finance",
    "travel",
  ];

  const fetchLatestBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
      .then(({ data }) => {
        setBlogs(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTrendingBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
      .then(({ data }) => {
        setTrendingBlogs(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterByCategory = (e) => {
    let category = e.target.innerText.toLowerCase();
    setBlogs(null);

    if (pageState == category) {
      setPageState("home");
      return;
    }

    setPageState(category);
  };

  const fetchByCategory = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        tag: pageState,
      })
      .then(({ data }) => {
        setBlogs(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    activeTab.current.click();

    if (pageState == "home") {
      fetchLatestBlogs();
    } else {
      fetchByCategory();
    }

    if (!trendingBlogs) {
      fetchTrendingBlogs();
    }
  }, [pageState]);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center md:gap-10">
        <div className="w-full">
          <MobileHomeNav
            routes={[pageState, "Trending blogs"]}
            defaultHidden={["Trending blogs"]}
          >
            <>
              {blogs == null ? (
                <Loader />
              ) : blogs.length ? (
                blogs.map((blog, i) => {
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
            </>

            {trendingBlogs == null ? (
              <Loader />
            ) : trendingBlogs.length ? (
              trendingBlogs.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: i * 0.1 }}
                    key={i}
                  >
                    <TrendingBlogCard blog={blog} index={i} />
                  </AnimationWrapper>
                );
              })
            ) : (
              <NoDataMessage message="No Trending blogs currently" />
            )}
          </MobileHomeNav>
        </div>

        {/* filters and trending blogs section */}
        <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-xl mb-8">
                Stories from all interests
              </h1>

              <div className="flex gap-3 flex-wrap">
                {categories.map((category, index) => {
                  return (
                    <button
                      key={index}
                      className={
                        "tag " +
                        (pageState == category ? " bg-black text-white" : " ")
                      }
                      onClick={filterByCategory}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="font-medium text-xl mb-8 flex items-center space-x-1">
                <span>Trending</span>
                <span>
                  <HiTrendingUp />
                </span>
              </div>

              {trendingBlogs == null ? (
                <Loader />
              ) : trendingBlogs.length ? (
                trendingBlogs.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}
                    >
                      <TrendingBlogCard blog={blog} index={i} />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NoDataMessage message="No trending blogs currently" />
              )}
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Home;
