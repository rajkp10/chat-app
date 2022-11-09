import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="h-full w-full grid place-content-center bg-white">
      <div className="flex flex-col h-full w-full max-w-xl items-center gap-4">
        <span className="text-3xl text-primary font-bold tracking-widest">
          Chattier
        </span>
        <form className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Email"
            className="h-12 w-[300px] text-lg text-primary p-1 bg-window tracking-wider rounded-t-lg outline-none border-b-2 border-b-primary placeholder-primary"
          />
          <input
            type="password"
            placeholder="Password"
            className="h-12 w-[300px] text-lg text-primary p-1 bg-window tracking-wider rounded-t-lg outline-none border-b-2 border-b-primary placeholder-primary"
          />
          <button className="btn bg-primary text-white border-none hover:bg-secondary">
            <Link to="/contacts">Login</Link>
          </button>
        </form>
        <p className="text-secondary">
          New user? Register{" "}
          <Link to="/register" className="underline text-primary">
            here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
