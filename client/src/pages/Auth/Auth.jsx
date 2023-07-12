import React, { useState } from "react";
// import "./auth.css";
import bgVideo from "../../assets/bg5.mp4";
import Register from "../../components/Register";
import Login from "../../components/Login";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const [show, setShow] = useState(true);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="w-full h-[100vh]">
      {!videoLoaded && (
        <img
          src="https://images.pexels.com/photos/13458334/pexels-photo-13458334.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt="Background Placeholder"
          className="w-full h-[100vh] object-cover"
        />
      )}

      <video
        className="w-full h-[100vh] object-cover"
        src={bgVideo}
        autoPlay
        preload="auto"
        muted
        loop
        onLoadedData={handleVideoLoad}
      ></video>
      {/* overlay div */}
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.7)]" />
      <div className="fixed w-full h-full top-0 left-0 pl-[20px] pt-[20px] flex mb-[20px]">
        <h1 className="text-4xl text-zinc-50 font-bold">
          Pexel - <span className="text-emerald-300">Share</span>
        </h1>
      </div>
      <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center text-white">
        {/* Auth Wrapper */}
        <div className=" w-[98%]  sm:w-[75%] lg:w-[45%] 2xl:w-[34%] m-auto">
          {/* conditional rendering */}
          {show ? <Login /> : <Register />}

          {/* options */}
          {!show ? (
            <div className="bg-zinc-100  mt-[1em] p-[10px] rounded-md text-left block md:flex justify-between  items-center">
              <div className="">
                <p className="text-xl text-black font-bold">
                  Not new here ?{" "}
                  <span
                    className="text-emerald-700 cursor-pointer"
                    onClick={() => setShow(!show)}
                  >
                    Log in
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-100  mt-[1em] p-[10px] rounded-md text-left block md:flex justify-between items-center">
              <div className="">
                <p className="text-xl text-black font-bold">
                  New here ?{" "}
                  <span
                    className="text-emerald-700 cursor-pointer"
                    onClick={() => setShow(!show)}
                  >
                    Create Account
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
