import React, { useContext, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import AnimationWrapper from "../../common/page-animation";
import { blogBanner } from "../../assets/assets";
import { uploadImage } from "../../common/aws";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../../contexts/EditorContext";
import { tools } from "../EditorTools/EditorTools";
import EditorJS from "@editorjs/editorjs";
import axios from "axios";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";

const BlogEditor = () => {
  let {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useContext(EditorContext);

  let { blog_id } = useParams();

  let {
    userAuthContext: { access_token },
  } = useContext(userContext);

  let navigate = useNavigate();

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

  const handlePublish = () => {
    if (!banner.length) return toast.error("Upload a banner before publish");
    if (!title.length) return toast.error("Blog title is required");
    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setEditorState("publish");
          } else {
            return toast.error("Please write something in blog");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDraft = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }
    if (!title.length) {
      return toast.error("Please give a blog title");
    }

    let loadingToast = toast.loading("Saving as draft...");
    e.target.classList.add("disable");

    if (textEditor.isReady) {
      textEditor.save().then((content) => {
        let blogObj = {
          title,
          banner,
          des,
          tags,
          content,
          draft: true,
        };

        axios
          .post(
            import.meta.env.VITE_SERVER_DOMAIN + "/create-blog",
            { ...blogObj, id: blog_id },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          )
          .then(() => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            toast.success("Blog saved 👍");

            setTimeout(() => {
              navigate("/");
            }, 500);
          })
          .catch(({ response }) => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            return toast.error(response.data.error);
          });
      });
    }
  };

  useEffect(() => {
    setTextEditor(
      new EditorJS({
        holder: "textEditor",
        data: Array.isArray(content) ? content[0] : content,
        tools: tools,
        placeholder: "Let's write an awesome blog",
      })
    );
  }, []);

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
          <button className="btn-dark py-2" onClick={handlePublish}>
            Publish
          </button>
          <button className="btn-light py-2" onClick={handleDraft}>
            Save Draft
          </button>
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
              defaultValue={title}
              placeholder="Blog Title"
              className="text-4xl h-14 font-medium w-full outline-none  resize-none  mt-10 leading-none placeholder:opacity-40"
              onKeyDown={handleTitleText}
              onChange={handleTitleChange}
            ></textarea>

            <hr className="w-full opacity-10 my-5" />

            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
