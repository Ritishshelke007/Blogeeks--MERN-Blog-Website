import React, { useContext, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import AnimationWrapper from "../../common/page-animation";
import { blogBanner } from "../../assets/assets";
import { uploadImage } from "../../common/aws";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../../contexts/EditorContext";

const BlogEditor = () => {
  let blogBannerRef = useRef();

  let {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog,
  } = useContext(EditorContext);

  const handleTitleText = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };
  const handleTitleChange = (e) => {
    let blogTitle = e.target;
    blogTitle.style.height = "auto";
    blogTitle.style.height = blogTitle.scrollHeight + "px";

    setBlog({ ...blog, title: blogTitle.value });
  };

  const handleBannerUpload = (e) => {
    let img = e.target.files[0];

    if (img) {
      let loadingToast = toast.loading("Uploading...");
      uploadImage(img)
        .then((url) => {
          if (url) {
            toast.dismiss(loadingToast);
            toast.success("Uploaded 👍");
            setBlog({ ...blog, banner: url });
          }
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          return toast.error("Upload failed");
        });
    }
  };

  const handleImgError = (e) => {
    let img = e.target;
    img.src = blogBanner;
  };
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="text-2xl font-bold">
          <div>Blogeeks</div>
        </NavLink>

        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {title.length ? title : "New Blog"}
        </p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>

      <Toaster />
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full px-10">
            <div className="relative aspect-video bg-white border-4 border-grey hover:opacity-80">
              <label htmlFor="uploadBanner">
                <img
                  src={banner}
                  alt="blog banner"
                  className="z-20"
                  onError={handleImgError}
                />
                <input
                  type="file"
                  id="uploadBanner"
                  accept=".png, .jpg, .jpeg "
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>

            <textarea
              placeholder="Blog Title"
              className="text-4xl h-20 font-medium w-full outline-none  resize-none  mt-10 leading-none placeholder:opacity-40"
              onKeyDown={handleTitleText}
              onChange={handleTitleChange}
            ></textarea>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
