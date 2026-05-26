import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logoutUser = () => {
    setLoading(true);
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);

      if (currentUser) {
        const userInfo = {
          email: currentUser.email,
        };

        console.log("API URL:", import.meta.env.VITE_API_URL);
        console.log("JWT userInfo:", userInfo);

        axios
          .post(`${import.meta.env.VITE_API_URL}/jwt`, userInfo)
          .then(res => {
            console.log("JWT response:", res.data);

            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
            }

            setLoading(false);
          })
          .catch(error => {
            console.log("JWT error:", error.response?.data || error.message);
            localStorage.removeItem("access-token");
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    loginUser,
    googleLogin,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;