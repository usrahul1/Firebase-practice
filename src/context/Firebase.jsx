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
import {
	addDoc,
	collection,
	getFirestore,
	getDocs,
	doc,
	getDoc,
	query,
	where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// 	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

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
			if (user) {
				setUser(user);
				// console.log(user);
			} else setUser(null);
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

	const getBookById = async (id) => {
		const docRef = doc(firestore, "books", id);
		const result = await getDoc(docRef);
		return result;
	};

	const placeOrder = async (bookId, qty) => {
		const collectionRef = collection(firestore, "books", bookId, "orders");
		const res = await addDoc(collectionRef, {
			username: user.displayName,
			userID: user.uid,
			userEmail: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			qty,
		});
		return res;
	};

	const fetchMyOrders = async () => {
		if (!user) {
			console.error("User not logged in");
			return;
		}
		const collectionRef = collection(firestore, "books");
		const q = query(collectionRef, where("userID", "==", user.uid));
		const res = await getDocs(q);
		// console.log(res.docs.map((doc) => doc.data()));
		console.log(res);
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
				getBookById,
				placeOrder,
				fetchMyOrders,
			}}
		>
			{props.children}
		</FirebaseContext.Provider>
	);
};

export const useFirebase = () => useContext(FirebaseContext);
