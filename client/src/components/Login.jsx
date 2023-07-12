import React, { useEffect, useState } from "react";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";

const Login = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      toast.success("Succesful sign in", { theme: "dark" });
      navigate("/");
    }
    dispatch(reset());
  }, [user, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error("Invalid credentials", { theme: "dark" });
    }

    dispatch(reset());
  }, [user, isError, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !password) {
      toast.error("All Details needed");
      return;
    }

    try {
      const payload = { name, password };
      dispatch(login(payload));
    } catch (error) {
      toast.error("Unable to sign you in");
    }
  };
  return (
    <div className="">
      <div className="bg-zinc-100  mb-[1em] p-[1.1em] rounded-md text-center">
        <h1 className="text-3xl sm:text-5xl text-black font-bold mb-[20px]">
          A Community of Art
        </h1>
        <h1 className="text-2xl sm:text-4xl text-gray-700 font-bold">
          Pexel - <span className="text-emerald-700">Share</span>
        </h1>
      </div>
      <form className="flex flex-col gap-[1em] " onSubmit={handleSubmit}>
        <input
          className="w-full p-[10px] bg-transparent outline-none text-lg rounded-md"
          style={{ border: "1px solid gray" }}
          type="text"
          placeholder="Enter your username"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex gap-5 items-center">
          <input
            className="w-full p-[10px] bg-transparent outline-none text-lg rounded-md"
            style={{ border: "1px solid gray" }}
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {show ? (
            <AiFillEyeInvisible
              className="cursor-pointer text-2xl"
              onClick={() => setShow(!show)}
            />
          ) : (
            <AiOutlineEye
              className="cursor-pointer text-2xl"
              onClick={() => setShow(!show)}
            />
          )}
        </div>

        {isLoading ? (
          <Spinner message="Authenticating" />
        ) : (
          <button
            className="w-full p-[10px] bg-emerald-700 outline-none text-lg rounded-md"
            //   style={{ border: "1px solid gray" }}
            onClick={handleSubmit}
          >
            Continue
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
