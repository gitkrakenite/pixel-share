import React, { useEffect, useState } from "react";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";

const Register = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      // toast.success("Succesful registration", { theme: "dark" });
      navigate("/");
    }

    dispatch(reset());
  }, [user, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // check all values
    if (!name || !email || !password || !cpassword) {
      toast("All details needed", { theme: "dark" });
      return;
    }

    // check password and cpassword
    if (password !== cpassword) {
      toast("Password Mismatch", { theme: "dark" });
      return;
    }

    try {
      const payload = { name, email, password };
      dispatch(register(payload));
    } catch (error) {
      toast.error("Unable to register you");
    }
  };

  return (
    <div className="">
      <div className="bg-zinc-100 mb-[1em] p-[0.5em] rounded-md text-center">
        <h1 className="text-xl sm:text-4xl text-zinc-600 font-bold ">
          Please Create An Account
        </h1>
        {/* <h1 className="text-2xl sm:text-3xl text-gray-700 font-bold">
          Pexel - <span className="text-emerald-700">Share</span>
        </h1> */}
      </div>
      <form className="flex flex-col gap-[1em] " onSubmit={handleSubmit}>
        <input
          className="w-full p-[10px] bg-transparent outline-none text-lg rounded-md"
          style={{ border: "1px solid gray" }}
          type="text"
          placeholder="Create a username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full p-[10px] bg-transparent outline-none text-lg rounded-md"
          style={{ border: "1px solid gray" }}
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="flex gap-5 items-center">
          <input
            className="w-full p-[10px] bg-transparent outline-none text-lg rounded-md"
            style={{ border: "1px solid gray" }}
            type={show ? "text" : "password"}
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
        <input
          className="w-full p-[10px] bg-transparent outline-none text-lg rounded-md"
          style={{ border: "1px solid gray" }}
          type={show ? "text" : "password"}
          placeholder="Confirm password"
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
          required
        />
        {isLoading ? (
          <Spinner message="Setting Up .." />
        ) : (
          <button
            className="w-full p-[10px] bg-emerald-700 outline-none text-lg rounded-md"
            //   style={{ border: "1px solid gray" }}
            onClick={handleSubmit}
          >
            Register Now
          </button>
        )}
      </form>
    </div>
  );
};

export default Register;
