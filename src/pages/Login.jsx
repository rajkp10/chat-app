import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebaseConfig";
import { motion } from "framer-motion";
import { transition } from "../pages/pageTransitions";

function Login() {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setTimeout(() => navigate("/"), 1500);
    }
  }, []);

  return (
    <motion.div
      variants={transition}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="h-full w-full grid place-content-center bg-white"
    >
      <div className="flex flex-col h-full w-full max-w-xl items-center gap-4">
        <span className="text-3xl text-primary font-bold tracking-widest">
          Chattier
        </span>
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            className="h-12 w-[300px] text-lg text-primary px-2 bg-window tracking-wider rounded-t-lg outline-none border-b-2 border-b-primary placeholder-primary"
          />
          <input
            type="password"
            placeholder="Password"
            className="h-12 w-[300px] text-lg text-primary px-2 bg-window tracking-wider rounded-t-lg outline-none border-b-2 border-b-primary placeholder-primary"
          />
          <button className="btn bg-primary text-white border-none hover:bg-secondary">
            Login
          </button>
        </form>
        <p className="text-secondary">
          New user? Register{" "}
          <Link to="/register" className="underline text-primary">
            here
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default Login;
