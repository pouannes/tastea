import React, { useContext } from "react";

import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/storage";

// TODO this needs to go in an env variable lol
const firebaseConfig = {
  apiKey: "AIzaSyAdvqm8mj1ZzOhSk1Pg0CnQuaSx9C08HvA",
  authDomain: "tastea-e538b.firebaseapp.com",
  projectId: "tastea-e538b",
  storageBucket: "tastea-e538b.appspot.com",
  messagingSenderId: "182448678410",
  appId: "1:182448678410:web:dbdbaa649207585c1721f3",
  measurementId: "G-1EP32N7FXX",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.firestore();
    this.analytics = app.analytics();
    this.storage = app.storage();
  }

  // *** Tea API ***

  addNewTea = (name, description, type) => {
    return this.db
      .collection("teaTypes")
      .doc(type)
      .collection("teas")
      .doc(name)
      .set({
        name,
        description,
        type,
      });
  };

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  doUpdateUserProfile = (newProfileData) =>
    this.auth.currentUser.updateProfile(newProfileData);

  doReauthenticateUserWithCredential = (email, password) =>
    this.auth.currentUser.reauthenticateWithCredential(
      app.auth.EmailAuthProvider.credential(email, password)
    );

  getUserDisplayName = () => this.auth.currentUser.displayName;

  getUserUid = () => this.auth.currentUser.uid;

  isUserSignedIn = () => Boolean(this.auth.currentUser);

  // *** User API ***

  user = (uid) => this.db.collection("users").doc(uid);
}

// *** Storage API ***

const FirebaseContext = React.createContext(null);

const useFirebase = () => {
  return useContext(FirebaseContext);
};

export { Firebase, FirebaseContext, useFirebase };
