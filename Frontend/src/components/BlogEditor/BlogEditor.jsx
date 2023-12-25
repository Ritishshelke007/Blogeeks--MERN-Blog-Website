import React from "react";
import { NavLink } from "react-router-dom";
import AnimationWrapper from "../../common/page-animation";
import { blogBanner } from "../../assets/assets";

const BlogEditor = () => {
  const handleBannerUpload = (e) => {
    let img = e.target.files[0];

    console.log(e);
  };
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="text-2xl font-bold">
          <div>Blogeeks</div>
        </NavLink>

        <p className="max-md:hidden text-black line-clamp-1 w-full">New Blog</p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full px-10">
            <div className="relative aspect-video bg-white border-4 border-grey hover:opacity-80">
              <label htmlFor="uploadBanner">
                <img src={blogBanner} alt="blog banner" className="z-20" />
                <input
                  type="file"
                  id="uploadBanner"
                  accept=".png, .jpg, .jpeg "
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
