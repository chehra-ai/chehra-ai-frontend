import React, { useState } from "react";
import TextInput from "components/TextInput";
import classes from "styles/pages/Authentication.module.css";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import ClickButton from "components/ClickButton";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "store/authSlice";

const ManageAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        let payload = {
          uid: user.uid,
          refreshToken: user.stsTokenManager.refreshToken,
          accessToken: user.stsTokenManager.accessToken,
          email: user.email,
          expirationTime: user.stsTokenManager.expirationTime,
          name: "Unknown",
        };
        dispatch(login(payload));
        navigate("/pricing");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div>
      <div className={classes.authForm}>
        <TextInput
          label="Email Address"
          placeholder="Enter email"
          value={email}
          setFunction={setEmail}
        />
        <TextInput
          label="Password"
          placeholder="Enter password"
          value={password}
          setFunction={setPassword}
        />
        <ClickButton buttonText="Login" handler={handleLogin} />
      </div>
      <p className={classes.alreadyUser}>New here?&nbsp;<Link to="/signup"><span>Signup</span></Link></p>
      {/* Social Login */}
    </div>
  );
};

export default ManageAuth;