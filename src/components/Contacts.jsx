import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebaseConfig";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

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
    <section className="w-full pt-1 grid sm:grid-cols-2 overflow-y-auto">
      {Object.entries(contacts).map((contact) => {
        const { userInfo } = contact[1];
        const { displayName, photoURL } = userInfo;
        return (
          <div
            key={contact[0]}
            className="group mx-2 p-2 flex items-center gap-4 cursor-pointer rounded-lg hover:-translate-y-1 hover:bg-primary transition duration-300"
            onClick={() => navigate("/chatwindow")}
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
                Hello how are you ?
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Contacts;
