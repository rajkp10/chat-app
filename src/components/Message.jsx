import React from "react";

function Message({ owner }) {
  // const owner = true;
  return (
    <div
      className={`w-full ${owner && "self-end"} flex flex-col ${
        owner && "items-end"
      } gap-2`}
    >
      <p
        className={`p-2 w-[80%] max-w-fit text-white ${
          owner ? "bg-secondary" : "bg-tertiary"
        } rounded-lg ${owner ? "rounded-tr-none" : "rounded-tl-none"}`}
      >
        Hello how are you ?
      </p>
      <img
        src="https://images.pexels.com/photos/7478159/pexels-photo-7478159.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        alt=""
        className="w-[50%]"
      />
    </div>
  );
}

export default Message;
