import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAArI9fKLmfqbwFvyYauqJT8NuZVDUCVr8",
  authDomain: "todolistforresult.firebaseapp.com",
  databaseURL:
    "https://todolistforresult-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todolistforresult",
  storageBucket: "todolistforresult.firebasestorage.app",
  messagingSenderId: "492129345904",
  appId: "1:492129345904:web:6036c60f14c3d492362fb5",
  databaseURL:
    "https://todolistforresult-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
