import React, { useContext, useReducer } from "react";
import { useAuthContext } from "./AuthContext";

const ChatContext = React.createContext();

const ChatProvider = ({ children }) => {
  const { currentUser } = useAuthContext();
  const INITIAL_STATE = {
    chatId: "",
    contactInfo: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_CONTACT":
        return {
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
          contactInfo: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ contact: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};

export { ChatContext, ChatProvider };
