import React from "react";
import { useEffect, useState } from "react";
import Blog from "../components/Blog";
import {
  addBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
} from "../utils/HandleApi";
import useAuth from "../hooks/useAuth";

function Articles() {
  const { auth } = useAuth();
  //Config for token
  const config = { headers: { Authorization: `Bearer ${auth.token}` } };
  const [blog, setBlog] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);
  const [blogId, setBlogId] = useState("");

  const [fetch, setFetch] = useState(true);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllBlog(config);
      setBlog(data || []);
      console.log(data);
    } catch (error) {
      console.log(error.message ? error.message : error);
    } finally {
      setLoading(false);
    }
  };
  console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault();
    addBlog(
      title,
      tags,
      content,
      setTitle,
      setTags,
      setContent,
      setBlog,
      config
    );
    setFetch(!fetch);
  };
  useEffect(() => {
    getUsers();
  }, [fetch]);

  const updateMode = (_id, title, tags, content) => {
    setIsUpdating(true);
    setTitle(title);
    setContent(content);
    setTags(tags);

    setBlogId(_id);
  };
  console.log(blog);
  if (loading)
    return (
      <h1 className="loading text-center text-[40px] text-primary p-80 font-bold">
        Loading...
      </h1>
    );
  console.log(blog.length);
  return (
    <div className=" min-height-screen container mx-auto px-2 my-6">
      <div>
        <div className=" flex  justify-center ">
          <div className="list">
            {blog.length &&
              blog.map((item) => (
                <Blog
                  key={item._id}
                  data={item}
                  updateMode={() => {
                    updateMode(item._id, item.title, item.content, item.tags);
                  }}
                  deleteblog={() => {
                    deleteBlog(item._id, setBlog);
                    window.location.reload();
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Articles;
