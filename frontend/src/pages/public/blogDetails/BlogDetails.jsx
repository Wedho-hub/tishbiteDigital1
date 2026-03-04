import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/common/pageHeader/PageHeader";
import { useParams } from "react-router-dom";
import { getBlogPostById } from "../../../services/blogService";
import ReactMarkdown from "react-markdown";
import "./blogDetails.css";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  useEffect(() => { getBlogPostById(id).then(setBlog); }, [id]);
  if (!blog) return <div>Loading...</div>;
  return (
    <>
      <PageHeader title={blog.title} subtitle={blog.subtitle || "Read the full article below."} background="light" />
      <div className="blog-content markdown-render">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>
    </>
  );
};

export default BlogDetails;
