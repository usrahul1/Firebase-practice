import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase";

const BookCard = (props) => {
	const firebase = useFirebase();
	const [url, seturl] = useState(null);

	useEffect(() => {
		firebase.getImageURL(props.imageURL).then((url) => seturl(url));
	}, []);

	return (
		<div>
			<Card style={{ width: "18rem", margin: "5px" }}>
				<Card.Img variant="top" src={url} />
				<Card.Body>
					<Card.Title>{props.name}</Card.Title>
					<Card.Text>
						This book is written by {props.displayName} and has a price of{" "}
						{props.price}
					</Card.Text>
					<Button variant="primary">Go somewhere</Button>
				</Card.Body>
			</Card>
		</div>
	);
};

export default BookCard;
