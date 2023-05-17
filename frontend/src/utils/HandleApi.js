import axios from "axios";

const baseUrl = "http://localhost:3000";

const getAllBlog = async (config) => {
  try {
    const response = await axios.get(`${baseUrl}/api/article`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const addBlog = (
  title,
  tags,
  content,
  setTitle,
  setTags,
  setContent,
  setBlog,
  config
) => {
  axios
    .post(`${baseUrl}/api/article/`, { title, content, tags }, config)
    .then((data) => {
      console.log(data);

      setTitle("");
      setContent("");
      setTags("");

      getAllBlog(setBlog);
    })
    .catch((error) => {
      console.log(error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;

        console.log(errors.message);
      }
    });
};

const updateBlog = (
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
) => {
  axios
    .put(
      `${baseUrl}/api/article/${blogId}`,
      {
        _id: blogId,
        title,
        content,
        tags,
      },
      config
    )
    .then((data) => {
      console.log(data);
      setTitle("");
      setTags("");
      setContent("");
      setIsUpdating(false);
      getAllBlog(setBlog);
    })
    .catch((err) => console.log(err));
};

const deleteBlog = (blogId, setBlog, config) => {
  return axios
    .delete(`${baseUrl}/api/article/${blogId}`, config)
    .then((response) => {
      console.log(response.data);
      getAllBlog(setBlog);
    })
    .catch((error) => console.log(error));
};

export { getAllBlog, addBlog, updateBlog, deleteBlog };
