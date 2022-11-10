import React from "react";
import { useAuthContext } from "../context/AuthContext";

function Message({ message }) {
  const { currentUser } = useAuthContext();

  return (
    <div
      className={`w-full ${
        message.senderId === currentUser.uid && "self-end"
      } flex flex-col ${
        message.senderId === currentUser.uid && "items-end"
      } gap-2`}
    >
      {message.text && (
        <p
          className={`p-2 w-[80%] max-w-fit text-white ${
            message.senderId === currentUser.uid
              ? "bg-secondary"
              : "bg-tertiary"
          } rounded-lg ${
            message.senderId === currentUser.uid
              ? "rounded-tr-none"
              : "rounded-tl-none"
          } shadow`}
        >
          {message.text}
        </p>
      )}
      {message.img && (
        <img src={message.img} alt="" className="w-[50%] shadow" />
      )}
    </div>
  );
}

export default Message;
