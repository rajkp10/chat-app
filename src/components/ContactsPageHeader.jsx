import React from "react";

function ContactsPageHeader() {
  return (
    <section className="h-[10%] w-full sticky px-4 flex justify-between items-center bg-primary drop-shadow">
      <span className="text-xl text-white font-bold">Chattier</span>
      <div className="flex justify-center items-center gap-4 visible">
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-8 mask mask-squircle">
              <img src="https://placeimg.com/192/192/people" />
            </div>
          </div>
          <span className="text-white">Raj</span>
        </div>
        <button className="btn btn-sm border-none bg-tertiary text-white hover:bg-secondary">
          Logout
        </button>
      </div>
    </section>
  );
}

export default ContactsPageHeader;
