import React from "react";
import Contacts from "../components/Contacts";
import Search from "../components/Search";
import ContactsPageHeader from "../components/ContactsPageHeader";

function ContactsPage() {
  return (
    <div className="h-full flex flex-col gap-4 bg-white">
      <ContactsPageHeader />
      <Search />
      <Contacts />
    </div>
  );
}

export default ContactsPage;
