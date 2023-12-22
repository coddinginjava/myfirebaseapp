import './App.css';
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(0);

  const userCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(userCollectionRef, { name: newName, age: Number(newNumber) });
  }

  const updateDataAge = async (id, age) => {
    const curDoc = doc(db, "users", id);
    const updatedField = { age: age + 1 }
    await updateDoc(curDoc, updatedField);

  }

  const deleteDataUsingId = async (id) => {
    const curDoc = doc(db, "users", id);
    await deleteDoc(curDoc);
  }

  useEffect(() => {
    const getusers = async () => {
      const getDocsUsers = await getDocs(userCollectionRef);
      setUsers(getDocsUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getusers();
  }, [])

  return (
    <div className="App">
      <input type="text" placeholder="name" onChange={(e) => setNewName(e.target.value)} />
      <input type="number" placeholder="number" onChange={(e) => setNewNumber(e.target.value)} />
      <button onClick={createUser}>Create User</button>
      <div>
        <ul>
          {users.map((u) => <li key={u.id}>{u.name} ..... {u.age}
            <button onClick={() => updateDataAge(u.id, u.age)}
            >inc age</button>
            <button onClick={() => deleteDataUsingId(u.id)}>delete ddocs
            </button></li>)}
        </ul>
      </div>
    </div>);
}

export default App;

