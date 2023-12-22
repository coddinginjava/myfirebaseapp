import './App.css';
import { auth } from "./firebase-config"
import { useState } from 'react';
import {
  createUserWithEmailAndPassword, signOut,
  signInWithEmailAndPassword, onAuthStateChanged
} from "firebase/auth"

function App() {

  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({})


  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  });

  const registerUser = async () => {
    console.log({ registerEmail, registerPassword });
    try {
      const usr = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log(usr);
    } catch (e) { console.error(e.message) }
  }

  const loginUser = async () => {
    try {
      const usr = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(usr);
    } catch (e) { console.error(e.message) }
  }

  const userlogOut = async () => {
    await signOut(auth);
  }


  return (
    <div className="App">
      <h1>Register User</h1>
      <div>
        <input onChange={(e) => setRegisterEmail(e.target.value)} placeholder='email' />
        <input onChange={(e) => setRegisterPassword(e.target.value)} placeholder='password' />
        <button onClick={() => registerUser()}> Register</button>
      </div>
      <h1>Login User</h1>
      <div>
        <input onChange={(e) => setLoginEmail(e.target.value)} placeholder='email' />
        <input onChange={(e) => setLoginPassword(e.target.value)} placeholder='password' />
        <button onClick={() => loginUser()}> Login</button>
      </div>

      <div>User Logged in : {user?.email}</div>
      <div>
        <button onClick={() => userlogOut()}>Log out</button>
      </div>
    </div>);
}

export default App;

