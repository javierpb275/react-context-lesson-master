import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD_NlIw3bo0gQ33rA2ELrGPNiJeLaAmg4s",
  authDomain: "cool-clothing-db-7b987.firebaseapp.com",
  databaseURL: "https://cool-clothing-db-7b987.firebaseio.com",
  projectId: "cool-clothing-db-7b987",
  storageBucket: "cool-clothing-db-7b987.appspot.com",
  messagingSenderId: "234467415521",
  appId: "1:234467415521:web:2064a99ec38ca41363aea0",
  measurementId: "G-3YJLXHG89M"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
