import axios from "../../axios";

// get all posts
const getPosts = async () => {
  const response = await axios.get("/post/all");
  return response.data;
};

// create posts
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/post/create", postData, config);
  return response.data;
};

const postService = {
  getPosts,
  createPost,
  // deletePost,
  // getReels,
  // createReel,
};

export default postService;
