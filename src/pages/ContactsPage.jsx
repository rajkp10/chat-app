import React from "react";
import Contacts from "../components/Contacts";
import Search from "../components/Search";
import ContactsPageHeader from "../components/ContactsPageHeader";
import { motion } from "framer-motion";
import { transition } from "../pages/pageTransitions";

function ContactsPage() {
  return (
    <motion.div
      variants={transition}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="h-full flex flex-col gap-4 bg-window"
    >
      <ContactsPageHeader />
      <Search />
      <Contacts />
    </motion.div>
  );
}

export default ContactsPage;
