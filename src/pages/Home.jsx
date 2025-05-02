import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/BookCard";
import { CardGroup } from "react-bootstrap";

const Home = () => {
	const firebase = useFirebase();
	const [books, setBooks] = useState([]);
	useEffect(() => {
		firebase.listAllBooks().then((books) => setBooks(books.docs));
	}, []);

	return (
		<div>
			All Books
			<CardGroup>
				{books.map((book) => (
					<BookCard key={book.id} {...book.data()} />
				))}
			</CardGroup>
		</div>
	);
};

export default Home;
