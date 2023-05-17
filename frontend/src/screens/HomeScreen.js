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
function HomeScreen() {
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
  const handleUpdate = (e) => {
    e.preventDefault();
    updateBlog(
      blogId,
      title,
      content,
      tags,
      setBlog,
      setTitle,
      setTags,
      setContent,
      setIsUpdating,
      config
    );
    setFetch(!fetch);
  };

  useEffect(() => {
    getUsers();
  }, [fetch]);

  const updateMode = (_id, title, content, tags) => {
    setTitle(title);
    setContent(content);
    setTags(tags);

    setIsUpdating(true);

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
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-4.5/5 max-w-5xl">
          <h3 className="font-bold text-lg">
            Hey! Share your Opinion with us.
          </h3>
          <form onSubmit={isUpdating ? handleUpdate : handleSubmit}>
            <div className="form-control  w-full">
              <label className="label">
                <span className="label-text">Title of the article?</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your content</span>
              </label>
              <textarea
                className="textarea textarea-bordered textarea-lg h-[198px]  "
                placeholder="Start typing here .."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Add some tags</span>
              </label>
              <input
                type="text"
                placeholder="Food, Travel, Pop culture..."
                className="input input-bordered w-full "
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div className="p-5">
              <input
                type="file"
                className="file-input file-input-bordered file-input-xs w-full max-w-xs"
              />
            </div>
            <div className="  flex justify-center">
              <button className="btn btn-wide ">
                {isUpdating ? "Update" : "Publish"}
              </button>
            </div>
          </form>
          <div className="modal-action">
            <label htmlFor="my-modal-5" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl text-[#282425] font-bold">
              Welcome to our opinion-sharing platform
            </h1>
            <p className="mb-5 text-[18px] text-white  font-medium">
              We're excited to have you on our site! Here, you can share your
              experiences and opinions on various topics with our online
              community. Whether you're a globetrotter, a foodie, or an expert
              in a particular field, our platform is the perfect place to
              exchange ideas and gain new perspectives
            </p>
            {/* The button to open modal */}
            <label htmlFor="my-modal-5" className="btn btn-primary">
              Share your first article
            </label>
          </div>
        </div>
      </div>
      <div className=" flex  justify-center ">
        <div className="list max-w-screen-xl ">
          {blog.length &&
            blog.map((item) => (
              <Blog
                key={item._id}
                data={item}
                updateMode={() => {
                  updateMode(item._id, item.title, item.content, item.tags);
                }}
                deleteBlog={() => {
                  deleteBlog(item._id, setBlog, config)
                    .then(() => {
                      window.location.reload();
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
