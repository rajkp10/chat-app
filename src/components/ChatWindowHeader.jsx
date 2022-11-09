import React from "react";
import { useNavigate } from "react-router-dom";

function ChatWindowHeader() {
  const navigate = useNavigate();

  return (
    <div className="h-[10%] w-full px-4 flex justify-between items-center bg-secondary drop-shadow">
      <div
        className="absolute cursor-pointer"
        onClick={() => navigate("/contacts")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>
      <div className="w-full flex justify-center items-center gap-2">
        <div className="avatar">
          <div className="w-8 mask mask-squircle">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <span className="text-lg text-white">John Doe</span>
      </div>
    </div>
  );
}

export default ChatWindowHeader;
