import { db } from "./config.js";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";

export const getRecords = async (req, res) => {
    try {
        const usersCollectionRef = collection(db, "Users");
        const snapshot = await getDocs(usersCollectionRef);
        const userList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        res.json(userList);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const createRecord = async (req, res) => {
    try {
        const { nombre, email, ciudad, equipo } = req.body;

        if (!nombre || !email || !ciudad || !equipo) {
            return res.status(400).send({ msg: "Todos los campos son requeridos." });
        };

        const usersRef = collection(db, 'Users');
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return res.status(400).send({ msg: "Ya existe un registro con ese email" });
        }

        const data = { nombre, email, ciudad, equipo };
        const docRef = await addDoc(collection(db, 'Users'), data);
        res.send({ msg: "User added", docId: docRef.id });
    } catch (error) {
        res.status(400).send({ msg: "Error adding user", error: error.message });
    }
}

export const updateRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const userDocRef = doc(db, 'Users', id);
        await updateDoc(userDocRef, data);

        res.send({ msg: "User updated", docId: id });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;

        const userDocRef = doc(db, 'Users', id);
        await deleteDoc(userDocRef);

        res.send({ msg: "User deleted", docId: id });
    } catch (error) {
        res.status(400).send(error.message);
    }
}