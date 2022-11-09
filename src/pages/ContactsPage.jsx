import React from "react";
import Contacts from "../components/Contacts";
import Search from "../components/Search";
import ContactsPageHeader from "../components/ContactsPageHeader";
import { useAuthContext } from "../context/AuthContext";

function ContactsPage() {
  const { currentUser } = useAuthContext();
  console.log(currentUser);
  return (
    <div className="h-full flex flex-col gap-4 bg-white">
      <ContactsPageHeader />
      <Search />
      <Contacts />
    </div>
  );
}

export default ContactsPage;
