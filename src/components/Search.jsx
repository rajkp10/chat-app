import React from "react";

function Search() {
  return (
    <section className="mx-2 sticky flex flex-col gap-4 border-b-2">
      <input
        type="text"
        placeholder="Search Contact..."
        className="w-full px-2 text-lg text-primary bg-transparent outline-none placeholder-slate-400"
      />
      <div
        className="group p-2 flex items-center gap-4 cursor-pointer hover:bg-primary hover:rounded-lg"
        onClick={() => navigate("/contacts/chatwindow")}
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
    </section>
  );
}

export default Search;
