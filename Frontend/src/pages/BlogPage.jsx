import React from "react";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  let { blog_id } = useParams();
  return <div>This is a blog page {blog_id} </div>;
};

export default BlogPage;
