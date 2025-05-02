import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
	apiKey: "AIzaSyC4BvkZ9ewxBnoH7wNeUfHsVOK0bdRpPoM",
	authDomain: "bookify-60a5e.firebaseapp.com",
	projectId: "bookify-60a5e",
	storageBucket: "bookify-60a5e.firebasestorage.app",
	messagingSenderId: "212436161771",
	appId: "1:212436161771:web:42ac37f464eb0ab0265aae",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);

export const FirebaseProvider = (props) => {
	const signUpUser = (email, password) => {
		createUserWithEmailAndPassword(firebaseAuth, email, password);
	};

	const signInUser = (email, password) => {
		signInWithEmailAndPassword(firebaseAuth, email, password);
	};

	const googleSignIn = () => signInWithPopup(firebaseAuth, googleProvider);

	const [user, setUser] = useState(null);

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, (user) => {
			if (user) setUser(user);
			else setUser(null);
		});
	});

	const isLoggedIn = user ? true : false;

    const handleCreateNewListing = (name, isbn, price, coverpic) => {
        
    }

	return (
		<FirebaseContext.Provider
			value={{ signUpUser, signInUser, googleSignIn, isLoggedIn }}
		>
			{props.children}
		</FirebaseContext.Provider>
	);
};

export const useFirebase = () => useContext(FirebaseContext);
