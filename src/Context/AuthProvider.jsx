import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { auth } from "../Firebase/Firebase.config";
import { useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { Children } from "react";

const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({Children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };


  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth,googleProvider)
}

const logOut = () => {
    setLoading(true);
    return signOut(auth);

}

const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser,profile)
}


useEffect(()=> {
    const unSubscribe =onAuthStateChanged(auth,(currentUser)=> {
        setUser(currentUser);
        setLoading(false);
    })
    return () => {
        unSubscribe();
    }
},[])


const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    signInGoogle,
    logOut,
    updateProfile,
}


  return <AuthContext.Provider value={Children}>{Children}</AuthContext.Provider>
};

export default AuthProvider;
