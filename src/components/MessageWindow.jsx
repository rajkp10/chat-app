import React, { useEffect, useState } from "react";
import Message from "./Message";
import { useChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function MessageWindow() {
  const [messages, setMessages] = useState([]);
  const { contact } = useChatContext();

  useEffect(() => {
    const getRealtimeMessage = onSnapshot(
      doc(db, "chats", contact.chatId),
      (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      }
    );
  }, [contact.chatId]);

  return (
    <div className="h-[80%] w-full p-2 bg-window space-y-2 overflow-y-auto overflow-x-hidden">
      {messages?.map((message) => {
        return <Message key={message.id} message={message} />;
      })}
    </div>
  );
}

export default MessageWindow;
