import React from "react";

import { download } from "../assets";
import { downloadImage } from "../utils";
import { useDispatch, useSelector } from "react-redux";

const Card = ({ _id, user, userId, description, image }) => {
  const dispatch = useDispatch();

  // const { user } = useSelector((state) => state.auth);

  // console.log(user._id);

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-[100%] object-cover rounded-xl"
        src={image}
        alt={description}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">
          {description}
        </p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {user[0]}
            </div>
            <p className="text-white text-sm">{user}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, image)}
            className="outline-none bg-transparent border-none"
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
