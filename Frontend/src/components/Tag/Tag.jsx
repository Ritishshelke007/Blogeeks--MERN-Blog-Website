import React, { useContext } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { EditorContext } from "../../contexts/EditorContext";

const Tag = ({ tag, tagIndex }) => {
  let {
    blog,
    blog: { tags },
    setBlog,
  } = useContext(EditorContext);
  const handleTagDelete = () => {
    tags = tags.filter((t) => t != tag);
    setBlog({ ...blog, tags });
  };

  const handleTagEdit = (e) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
      e.preventDefault();

      let currentTag = e.target.innerText;

      tags[tagIndex] = currentTag;

      setBlog({ ...blog, tags });

      e.target.setAttribute("contentEditable", false);
    }
  };

  const setEditable = (e) => {
    e.target.setAttribute("contentEditable", true);
    e.target.focus();
  };
  return (
    <div className="relative p-2 mt-2 mr-2 px-4 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10 ">
      <p
        className="outline-none "
        onKeyDown={handleTagEdit}
        onClick={setEditable}
      >
        {tag}
      </p>

      <button
        className=" mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2 "
        onClick={handleTagDelete}
      >
        <MdOutlineClose />
      </button>
    </div>
  );
};

export default Tag;
