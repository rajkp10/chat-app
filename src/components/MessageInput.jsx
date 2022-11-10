import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase/firebaseConfig";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function MessageInput() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useAuthContext();
  const { contact } = useChatContext();
  const { contactInfo } = contact;

  const handleSend = async () => {
    try {
      if (img) {
        console.log("hello");
        const storageRef = ref(storage, "sharedImg/" + uuid());

        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", contact.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    img: downloadURL,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                  }),
                });
              }
            );
          }
        );
      } else if (text) {
        await updateDoc(doc(db, "chats", contact.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, "userChats", contactInfo.uid), {
        [contact.chatId + ".lastMessage"]: text,
        [contact.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [contact.chatId + ".lastMessage"]: text,
        [contact.chatId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }

    setText("");
    setImg(null);
  };

  return (
    <div className="h-[10%] px-4 bg-white flex p-2">
      <input
        type="text"
        placeholder="Type here..."
        className="h-90% w-full text-lg text-black outline-none bg-transparent"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center gap-4">
        <label htmlFor="img" className="cursor-pointer text-tertiary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </label>
        <input
          type="file"
          className="hidden"
          id="img"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <button
          className="btn btn-sm border-none bg-tertiary text-white hover:bg-secondary"
          onClick={handleSend}
        >
          send
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
