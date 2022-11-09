import React from "react";
import { useNavigate } from "react-router-dom";

function Contacts() {
  const navigate = useNavigate();
  const contacts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <section className="w-full grid sm:grid-cols-2 overflow-y-auto">
      {contacts.map((contact) => {
        return (
          <div
            className="group mx-2 p-2 flex items-center gap-4 cursor-pointer hover:bg-primary hover:rounded-lg"
            onClick={() => navigate("/chatwindow")}
          >
            <div className="avatar">
              <div className="w-14 mask mask-squircle">
                <img src="https://placeimg.com/192/192/people" />
              </div>
            </div>
            <div className="w-full flex flex-col justify-between">
              <span className="text-lg text-primary font-semibold group-hover:text-white">
                John Doe
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
