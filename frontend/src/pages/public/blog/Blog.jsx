import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/common/pageHeader/PageHeader";
import { Link } from "react-router-dom";
import { getBlogPosts } from "../../../services/blogService";
import "./blog.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => { getBlogPosts().then(setBlogs); }, []);
  return (
    <>
      <PageHeader title="Blog" subtitle="Read our latest articles and insights." background="light" />
      <section className="blog-page-wrap container">
        <ul className="blog-list">
          {blogs.map(blog => (
            <li key={blog._id} className="blog-list-item">
              <Link to={`/blog/${blog._id}`} className="blog-list-link">{blog.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Blog;
