import React from "react";
import ChatWindowHeader from "../components/ChatWindowHeader";
import MessageInput from "../components/MessageInput";
import MessageWindow from "../components/MessageWindow";

function ChatWindow() {
  return (
    <div className="h-full w-full flex flex-col">
      <ChatWindowHeader />
      <MessageWindow />
      <MessageInput />
    </div>
  );
}

export default ChatWindow;
