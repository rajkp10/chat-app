import React, { useEffect, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

function Message({ message }) {
  const { currentUser } = useAuthContext();
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({
      behaviour: "smooth",
    });
  }, [message]);

  return (
    <motion.div
      className={`w-full ${
        message.senderId === currentUser.uid && "self-end"
      } flex flex-col ${
        message.senderId === currentUser.uid && "items-end"
      } gap-2`}
      initial={{
        opacity: 0,
        x: message.senderId === currentUser.uid ? 100 : -100,
      }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
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
    </motion.div>
  );
}

export default Message;
