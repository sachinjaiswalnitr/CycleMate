import {createContext, useState} from 'react';
import {initializeApp} from 'firebase/app'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDTo5NRHN1sQhvZHtrmU6FM9_K_t7HU8wM",
  authDomain: "cyclemania-d8c5d.firebaseapp.com",
  projectId: "cyclemania-d8c5d",
  storageBucket: "cyclemania-d8c5d.firebasestorage.app",
  messagingSenderId: "1003015384851",
  appId: "1:1003015384851:web:790e8ecc44e08ce051b4e6",
  measurementId: "G-LTFJGLTJRX"
};

const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const googleProvider=new GoogleAuthProvider();
const db=getFirestore(app);

export const FirebaseContext=createContext(null);

export const FirebaseProvider=(props)=>{

  const signIn=()=>{
    return signInWithPopup(auth,googleProvider)
    .then(async (result)=>{
      const user=result.user;
      const token=await user.getIdToken();

      const credential=GoogleAuthProvider.credentialFromResult(result);
      const googleAccessToken=credential.accessToken;

      localStorage.setItem("user",JSON.stringify({
        name:user.displayName,
        email:user.email,
        photoURL:user.photoURL,
        token:token,
        googleAccessToken:googleAccessToken
      }));

      console.log("User info saved to local storage");
      return user;
    })
    .catch((err)=>{
      console.log("Sign in failed");
      throw err;
    })
  }

  const [buy,setBuy]=useState(0);
  const [sell,setSell]=useState(0);
  const [lend,setLend]=useState(0);
  const [borr,setBorr]=useState(0);
  const [rep,setRep]=useState(0);

  const sellCycle=()=>{
    setSell(sell+1);
  }

  const buyCycle=()=>{
    setBuy(buy+1);
  }

  const lendCycle=()=>{
    setLend(lend+1);
  }

  const borCycle=()=>{
    setBorr(borr+1);
  }

  const repCycle=()=>{
    setRep(rep+1);
  }
  

  return(
    <FirebaseContext.Provider value={{signIn, auth, db, sellCycle, borCycle, lendCycle, buyCycle, repCycle, buy, sell, lend, borr, rep}}>
      {props.children}
    </FirebaseContext.Provider>
  )
}