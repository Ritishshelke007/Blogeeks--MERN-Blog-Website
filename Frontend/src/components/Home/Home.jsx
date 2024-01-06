import React from "react";
import AnimationWrapper from "../../common/page-animation";
import MobileHomeNav from "../MobileHomeNavigation/MobileHomeNav";

const Home = () => {
  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <MobileHomeNav
            routes={["Home", "Trending blogs"]}
            defaultHidden={["Trending blogs"]}
          >
            <h1>Latest blogs</h1>
            <h1>Trending blogs</h1>
          </MobileHomeNav>
        </div>

        <div></div>
      </section>
    </AnimationWrapper>
  );
};

export default Home;
