import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const List = () => {
	const [name, setName] = useState("");
	const [isbnNumber, setIsbnNumber] = useState("");
	const [price, setPrice] = useState("");
	const [coverPic, setCoverPic] = useState("");

	const firebase = useFirebase();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await firebase.handleCreateNewListing(
			name,
			isbnNumber,
			price,
			coverPic
		);
		console.log(res);
	};

	return (
		<div className="container mt-5">
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Enter book name</Form.Label>
					<Form.Control
						onChange={(e) => setName(e.target.value)}
						value={name}
						type="text"
						placeholder="book name"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>ISBN Number</Form.Label>
					<Form.Control
						onChange={(e) => setIsbnNumber(e.target.value)}
						value={isbnNumber}
						type="text"
						placeholder="ISBN Number"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Price</Form.Label>
					<Form.Control
						onChange={(e) => setPrice(e.target.value)}
						value={price}
						type="text"
						placeholder="Price"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Cover pic</Form.Label>
					<Form.Control
						onChange={(e) => setCoverPic(e.target.files[0])}
						type="file"
						placeholder="ISBN Number"
					/>
				</Form.Group>

				<Button onClick={handleSubmit} variant="primary" type="submit">
					Create
				</Button>
			</Form>
		</div>
	);
};

export default List;
