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
    <section className="mx-2 sticky flex flex-col gap-4 border-b-2 border-b-secondary">
      <input
        type="text"
        placeholder="Search Contact..."
        className="w-full px-2 text-lg text-primary bg-transparent outline-none placeholder-slate-400"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {contact && (
        <div
          className="group p-2 flex items-center gap-4 cursor-pointer rounded-lg hover:bg-primary hover:-translate-y-1 hover:animate-none animate-pulse tranisiton duration-300"
          onClick={handleClick}
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
            <p className="text-sm text-gray-400 group-hover:text-slate-300">
              Hello how are you ?
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Search;
