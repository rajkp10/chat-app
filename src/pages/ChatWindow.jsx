import React from "react";
import ChatWindowHeader from "../components/ChatWindowHeader";
import MessageInput from "../components/MessageInput";
import MessageWindow from "../components/MessageWindow";
import { motion } from "framer-motion";
import { transition } from "../pages/pageTransitions";

function ChatWindow() {
  return (
    <motion.div
      variants={transition}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="h-full w-full flex flex-col"
    >
      <ChatWindowHeader />
      <MessageWindow />
      <MessageInput />
    </motion.div>
  );
}

export default ChatWindow;
