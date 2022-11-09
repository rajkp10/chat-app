import React from "react";
import Message from "./Message";

function MessageWindow() {
  return (
    <div className="h-[80%] w-full p-2 bg-window space-y-2 overflow-y-auto">
      <Message owner={true} />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
}

export default MessageWindow;
