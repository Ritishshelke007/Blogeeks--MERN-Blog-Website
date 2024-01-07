import React, { useEffect, useState } from "react";
import AnimationWrapper from "../../common/page-animation";
import MobileHomeNav from "../MobileHomeNavigation/MobileHomeNav";
import axios from "axios";
import Loader from "../Loader/Loader";
import BlogCard from "../BlogCard/BlogCard";

const Home = () => {
  const [blogs, setBlogs] = useState(null);

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

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center md:gap-10">
        <div className="w-full">
          <MobileHomeNav
            routes={["Home", "Trending blogs"]}
            defaultHidden={["Trending blogs"]}
          >
            <>
              {blogs == null ? (
                <Loader />
              ) : (
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
              )}
            </>
          </MobileHomeNav>
        </div>

        <div></div>
      </section>
    </AnimationWrapper>
  );
};

export default Home;
