import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: `${process.env.FIREBASE_API_KEY}`,
    authDomain: "nodejs-test-2df77.firebaseapp.com",
    projectId: "nodejs-test-2df77",
    storageBucket: "nodejs-test-2df77.appspot.com",
    messagingSenderId: "238456911169",
    appId: "1:238456911169:web:28202fe4ea50d31300ddc0",
    measurementId: "G-YYSBD3DBX2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const User = collection(db, 'Users');



