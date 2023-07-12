import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { preview } from "../assets";
import { categories } from "../categories";
import { createPost } from "../features/post/postSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const CreatePost = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { posts, isSuccess } = useSelector((state) => state.posts);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login or register");
      return;
    }

    if (!category || !description || !image || !user) {
      toast.error("All details needed", { theme: "dark" });
      return;
    }

    try {
      const payload = { description, image, category };
      dispatch(createPost(payload));
      toast.success("Created a post", { theme: "dark" });
      navigate("/");
    } catch (error) {
      toast.error("Failed to create" + error, { theme: "dark" });
    }
  };

  useEffect(() => {
    if (!user) {
      toast.error("Please login or register");
      navigate("/auth");
      return;
    }
  }, [user]);

  // uploading mainPhoto
  const [loadUpload, setLoadUpload] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const postPhoto = async (pic) => {
    setLoadUpload(true);
    if (pic === null || undefined) {
      toast.error("Please select main photo");
      setLoading(false);
      return;
    }

    setImagePreview(URL.createObjectURL(pic));

    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "p2jnu3t2");
    try {
      setLoadUpload(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/ddqs3ukux/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await res.json();
      setLoadUpload(false);
      setImage(urlData.url);
      toast.success("Uploaded Photo");
    } catch (error) {
      setLoadUpload(false);
      toast.error("Error uploading Photo");
    }
  };

  return (
    <div className="w-[90%] m-auto pt-[1em]">
      <Link to="/">
        <div className="mb-[50px] cursor-pointer">
          <h1 className="text-2xl sm:text-4xl text-gray-700 font-bold">
            Pexel<span className="text-emerald-700">Share</span>
          </h1>
        </div>
      </Link>

      <h2 className="font-bold text-2xl mb-[0.5em]">Create</h2>
      <p className="text-zinc-600 text-md">
        Contribute to our community by sharing images
      </p>
      <p className="text-zinc-600 text-md mb-[1em]">
        Images posted are copyright free
      </p>

      <form className="mt-[4em]" onSubmit={handleSubmit}>
        {/* <div className="flex flex-col mb-[20px]">
          <label htmlFor="title">Enter Short Title</label>
          <input
            type="text"
            style={{
              border: "1px solid gray",
              width: "60%",
              marginTop: "15px",
              padding: "8px",
              borderRadius: "5px",
            }}
            required
            maxLength={20}
            id="title"
            placeholder="i.e A large monkey"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div> */}

        <div className="flex flex-col mb-[20px]">
          <label htmlFor="description">Enter Short Description</label>
          <input
            type="text"
            className=" w-[100%] md:w-[60%]"
            style={{
              border: "1px solid gray",
              marginTop: "15px",
              padding: "8px",
              borderRadius: "5px",
            }}
            required
            // maxLength={40}
            id="description"
            placeholder="i.e I went to the zoo and found a huge monkey that was called Tom. He eats mangoes and bananas"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/*  */}
        <div className="flex flex-col items-start gap-[20px] sm:gap-0 sm:flex-row sm:items-center mt-[20px] mb-[20px]  px-[5px] rounded-lg">
          <div className="flex flex-col gap-2 mt-[20px]">
            <label
              htmlFor="mainPhoto"
              className="flex items-center gap-[20px] flex-wrap"
            >
              <p>Please Select Photo</p>
              <div className="flex flex-col items-center">
                {loadUpload ? (
                  <Spinner message="uploading ..." />
                ) : (
                  <img
                    src={
                      imagePreview
                        ? imagePreview
                        : "https://pixel-share-25.netlify.app/assets/preview-35b286f0.png"
                    }
                    alt=""
                    className="w-[100px] h-[100px] object-cover"
                  />
                )}
              </div>
            </label>
            <input
              type="file"
              placeholder="Add Image"
              accept="image/*"
              onChange={(e) => postPhoto(e.target.files[0])}
              required
              id="mainPhoto"
              className="hidden"
            />
          </div>
        </div>
        {/*  */}

        <div className="flex flex-col mb-[20px]">
          <label htmlFor="category">Enter Category</label>

          <select
            id="category"
            className=" w-[100%] md:w-[60%]"
            style={{
              border: "1px solid gray",

              marginTop: "15px",
              padding: "8px",
              borderRadius: "5px",
            }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="select">Select</option>
            {categories.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div>
          <img
            className="w-[250px] h-[200px] object-cover rounded-md"
            src={image ? image : preview}
            alt=""
          />
        </div>

        <p className="mb-[2em] mt-[1em]">
          ** NOTE that everyone will be able to see your image **
        </p>
        <button
          className="bg-emerald-600 p-[20px] cursor-pointer rounded-md text-white mb-[1em]"
          type="submit"
          onClick={handleSubmit}
        >
          Share with the community
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
