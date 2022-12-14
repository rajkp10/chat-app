import React, { useState } from "react";
import {
  collection,
  getDoc,
  getDocs,
  setDoc,
  doc,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

function Search() {
  const [displayName, setDisplayName] = useState("");
  const [contact, setContact] = useState(null);
  const { currentUser } = useAuthContext();

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", displayName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setContact(doc.data());
      });
      setDisplayName("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleClick = async () => {
    const combinedId =
      currentUser.uid > contact.uid
        ? currentUser.uid + contact.uid
        : contact.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: contact.uid,
            displayName: contact.displayName,
            photoURL: contact.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", contact.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    setContact(null);
  };

  return (
    <motion.section
      className="mx-2 sticky flex flex-col gap-2 border-b-2 border-b-secondary"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
    >
      <div className="w-full p-2 flex items-center">
        <input
          type="text"
          placeholder="Search Contact..."
          className="w-full text-lg text-primary bg-transparent outline-none placeholder-slate-400"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="btn btn-sm btn-accent text-white"
          onClick={handleSearch}
        >
          search
        </button>
      </div>
      {contact && (
        <motion.div
          className="group p-2 pt-1 mb-2 flex items-center gap-4 cursor-pointer rounded-lg hover:bg-primary hover:-translate-y-1 hover:animate-none animate-pulse"
          onClick={handleClick}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
        >
          <div className="avatar">
            <div className="w-14 mask mask-squircle">
              <img src={contact.photoURL} />
            </div>
          </div>
          <div className="w-full flex flex-col justify-between">
            <span className="text-lg text-primary font-semibold group-hover:text-white">
              {contact.displayName}
            </span>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}

export default Search;
