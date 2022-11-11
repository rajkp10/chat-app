import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function ContactsPageHeader() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  const { photoURL, displayName } = currentUser;

  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <section className="h-[75px] w-full sticky px-4 flex justify-between items-center bg-primary drop-shadow">
      <span className="text-xl text-white font-bold tracking-wider">
        Chattier
      </span>
      <div className="flex justify-center items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="avatar hover:scale-125 hover:-translate-y-1 transition duration-300">
            <div className="w-8 mask mask-squircle">
              <img src={photoURL} />
            </div>
          </div>
          <span className="text-white">{displayName}</span>
        </div>
        <button
          className="btn btn-sm border-none bg-tertiary text-white hover:bg-secondary transition duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default ContactsPageHeader;
