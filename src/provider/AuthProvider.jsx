import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import auth from "../config/firebase.config";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  //login an existing user
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //update user info into firebase
  const updateUserInfo = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //creating a new user
  const userRegister = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //logout current user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      //   if (currentUser) {
      //     const userInfo = { email: currentUser?.email };
      //     getToken(userInfo);
      //     setLoading(false);
      //   } else {
      //     clearCookie();
      //     setLoading(false);
      //   }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    userLogin,
    user,
    logOut,
    userRegister,
    loading,
    updateUserInfo,
  };
  console.log(user)

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
