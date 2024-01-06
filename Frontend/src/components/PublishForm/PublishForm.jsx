import React, { useContext } from "react";
import AnimationWrapper from "../../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import { GrClose } from "react-icons/gr";
import { EditorContext } from "../../contexts/EditorContext";
import Tag from "../Tag/Tag";

const PublishForm = () => {
  const charLimit = 200;
  const tagLimit = 7;

  let {
    blog,
    blog: { banner, title, tags, des },
    setEditorState,
    setBlog,
  } = useContext(EditorContext);
  const handleClose = () => {
    setEditorState("editor");
  };

  const handleOnTitleChange = (e) => {
    let input = e.target;

    setBlog({ ...blog, title: input.value });
  };

  const handleOnDesChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, des: input.value });
  };

  const handleTitleText = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
      e.preventDefault();

      let tag = e.target.value;

      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        }
      } else {
        toast.error(`Maximum ${tagLimit} tags are allowed `);
      }
      e.target.value = "";
    }
  };

  return (
    <AnimationWrapper>
      <section className="max-h-screen grid items-center lg:grid-cols-2 py-16 px-10">
        <Toaster />
        <button
          className="absolute right-[5vw] z-10 top-[4%] lg:text-xl hover:scale-110 duration-100 ease-in"
          onClick={handleClose}
        >
          <GrClose size={20} />
        </button>

        <div className="block mx-auto max-w-[550px]">
          <p className="text-dark-grey mb-1">Preview</p>

          <div className="w-full aspect-video rounded-lg overflow-hidden mt-4 bg-grey">
            <img src={banner} alt="Blog banner" />
          </div>

          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>

          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {des}
          </p>
        </div>

        <div className="">
          <p className="mb-2 mt-5 text-dark-grey">Blog Title</p>
          <input
            type="text"
            placeholder="Blog title"
            defaultValue={title}
            className="input-box pl-4"
            onChange={handleOnTitleChange}
          />

          <p className=" mt-5 text-dark-grey">Short Description</p>
          <textarea
            className="h-36 resize-none leading-7 input-box pl-4"
            maxLength={charLimit}
            defaultValue={des}
            onChange={handleOnDesChange}
            onKeyDown={handleTitleText}
          ></textarea>

          <p className="mt-0.5 text-dark-grey text-sm text-right">
            {charLimit - des.length} characters left
          </p>

          <p className="mb-2 mt-5 text-dark-grey">
            Tags - (Helps in ranking your blog)
          </p>

          <div className="input-box relative pl-2 py-2 pb-4">
            <input
              type="text"
              placeholder="Tag"
              className="sticky input-box bg-white top-0 left-0 pl-4  focus:bg-white"
              onKeyDown={handleKeyDown}
            />
            {tags.map((tag, i) => (
              <Tag tag={tag} tagIndex={i} key={i} />
            ))}
          </div>

          <p className="mt-0.5 text-dark-grey text-sm text-right">
            {tagLimit - tags.length} tags left
          </p>

          <button className="btn-dark px-8">Publish</button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
