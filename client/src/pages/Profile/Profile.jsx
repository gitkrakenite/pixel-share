import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { logout } from "../../features/auth/authSlice";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [cover, setCover] = useState("");

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Updated succesfully", { theme: "dark" });
      // navigate("/");
    }
    dispatch(reset());
  }, [user, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info("Being developed", { theme: "dark" });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };
  return (
    <div className="">
      <div>
        <img
          src={
            cover ||
            "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=1600"
          }
          alt=""
          className="w-full h-[40vh] md:h-[50vh] object-cover "
        />
      </div>
      <div>
        <img
          src={
            user?.profile ||
            "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=1600"
          }
          alt=""
          className="w-[100px] h-[100px] object-cover rounded-full absolute md:top-[45%] md:left-[48%] z-50 top-[34%] left-[38%]"
        />
      </div>
      {/* user details */}
      <div className="relative block md:flex mt-[6em] pl-[2em] pr-[2em] gap-[1em] ">
        <div className="flex-[0.5]">
          <h1 className="mb-[1em] font-bold text-white bg-emerald-700 p-[10px] rounded-md">
            Here are your current details
          </h1>
          <h1>
            Current username is: <span className="font-bold">{user?.name}</span>{" "}
          </h1>
          <h1>
            Current email is: <span className="font-bold">{user?.email}</span>{" "}
          </h1>
          <h1>
            Your account was created{" "}
            <span className="font-bold">
              {moment(user?.createdAt).fromNow()}
            </span>{" "}
          </h1>

          <Link to="/">
            <h1 className="mt-[1em] text-white bg-emerald-800 cursor-pointer p-[10px] text-center rounded-lg">
              Click to see other people's posts
            </h1>
          </Link>

          <h1
            className="mt-[1em] text-white bg-red-800 cursor-pointer p-[10px] text-center rounded-lg"
            onClick={handleLogout}
          >
            Logout of your account
          </h1>
        </div>
      </div>
      {/* show your pictures */}
      <div className="mt-[4em] pl-[2em] pr-[2em] gap-[1em]">
        {/* <h1>All your pictures</h1> */}
        {/* all your images */}
      </div>
    </div>
  );
};

export default Profile;
