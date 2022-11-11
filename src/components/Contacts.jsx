import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useChatContext } from "../context/ChatContext";
import { db } from "../firebase/firebaseConfig";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, x: -100 },
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    transition: { type: "spring", duration: 0.5, delay: custom * 0.5 },
  }),
};

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const { currentUser } = useAuthContext();
  const { dispatch } = useChatContext();
  const navigate = useNavigate();
  var i = 1;

  const handleClick = (userInfo) => {
    dispatch({ type: "CHANGE_CONTACT", payload: userInfo });
    navigate(`/contacts/${userInfo.uid}`);
  };

  useEffect(() => {
    const getContacts = () => {
      const realtimeFetch = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          setContacts(doc.data());
        }
      );
    };
    currentUser.uid && getContacts();
  }, [currentUser.uid]);

  return (
    <ul className="w-full pt-1 grid sm:grid-cols-2 overflow-y-auto">
      {Object.entries(contacts)
        .sort((a, b) => b[1].date - a[1].date)
        .map((contact) => {
          const { userInfo, lastMessage } = contact[1];
          const { displayName, photoURL } = userInfo;

          return (
            <motion.li
              key={contact[0]}
              className="group mx-2 p-2 flex items-center gap-4 cursor-pointer rounded-lg hover:-translate-y-1 hover:bg-primary transition duration-300"
              onClick={() => handleClick(userInfo)}
              custom={i++}
              variants={item}
              initial="hidden"
              animate="visible"
            >
              <div className="avatar">
                <div className="w-14 mask mask-squircle">
                  <img src={photoURL} />
                </div>
              </div>
              <div className="w-full flex flex-col justify-between">
                <span className="text-lg text-primary font-semibold group-hover:text-white">
                  {displayName}
                </span>
                <p className="text-sm text-gray-400 group-hover:text-slate-300">
                  {lastMessage}
                </p>
              </div>
            </motion.li>
          );
        })}
    </ul>
  );
}

export default Contacts;
