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
import { addDoc, collection, getFirestore, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const storage = getStorage(firebaseApp);

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

	const handleCreateNewListing = async (name, isbn, price, cover) => {
		const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
		const uploadResult = await uploadBytes(imageRef, cover);
		await addDoc(collection(firestore, "books"), {
			name,
			isbn,
			price,
			imageURL: uploadResult.ref.fullPath,
			userID: user.uid,
			userEmail: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
		});
	};

	const listAllBooks = () => {
		return getDocs(collection(firestore, "books"));
	};

	const getImageURL = (path) => {
		return getDownloadURL(ref(storage, path));
	};

	return (
		<FirebaseContext.Provider
			value={{
				signUpUser,
				signInUser,
				googleSignIn,
				isLoggedIn,
				handleCreateNewListing,
				listAllBooks,
				getImageURL,
			}}
		>
			{props.children}
		</FirebaseContext.Provider>
	);
};

export const useFirebase = () => useContext(FirebaseContext);
