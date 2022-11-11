import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";

function Register() {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const acceptedImageTypes = [
    "image/gif",
    "image/jpg",
    "image/jpeg",
    "image/png",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const avatar = e.target[3].files[0];

    if (avatar.size > 307200) {
      return;
    }
    if (
      !displayName ||
      !email ||
      !password ||
      !avatar ||
      !acceptedImageTypes.includes(avatar.type)
    ) {
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, "avatars/" + displayName);

      const uploadTask = uploadBytesResumable(storageRef, avatar);

      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
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
    <div className="h-full w-full grid place-content-center bg-white">
      <div className="flex flex-col h-full w-full max-w-xl items-center gap-4">
        <span className="text-3xl text-primary font-bold tracking-widest">
          Chattier
        </span>
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Chattier Name"
            className="h-12 w-[300px] text-lg text-primary px-2 bg-window tracking-wider rounded-t-lg outline-none border-b-2 border-b-primary placeholder-primary"
          />
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
          <input
            type="file"
            id="img"
            className="file-input file-input-window h-12 w-[300px] border-2 border-primary"
          />
          <button className="btn bg-primary text-white hover:bg-secondary">
            Register
          </button>
        </form>
        <p className="text-secondary">
          Existing user? Login{" "}
          <Link to="/" className="underline text-primary">
            here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
