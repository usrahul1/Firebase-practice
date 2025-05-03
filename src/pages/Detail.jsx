import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/button";

const Detail = () => {
	const params = useParams();
	const firebase = useFirebase();
	const [data, setData] = useState(null);
	const [url, setURL] = useState(null);
	const [qty, setQty] = useState(1);

	const placeOrder = async () => {
		const res = await firebase.placeOrder(params.bookId, qty);
		console.log("order placed", res);
	};

	useEffect(() => {
		firebase.getBookById(params.bookId).then((val) => setData(val.data()));
	}, []);

	useEffect(() => {
		if (data) {
			const imgURL = data.imageURL;
			firebase.getImageURL(imgURL).then((url) => setURL(url));
		}
	}, [data]);

	if (data === null) {
		return <h1>Loading....</h1>;
	}

	console.log(params);
	return (
		<div className="container">
			<h1>{data.name}</h1>
			<img src={url} width={"50%"} style={{ borderRadius: "10px" }} />
			<h1>Details</h1>
			<p>Price: {data.price}</p>
			<h5>Owner Details</h5>
			<p>Name: {data.displayName}</p>
			<p>Email: {data.userEmail}</p>
			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Quantity</Form.Label>
				<Form.Control
					onChange={(e) => setQty(e.target.value)}
					value={qty}
					type="Number"
					placeholder="Quantity"
				/>
			</Form.Group>
			<Button onClick={placeOrder} variant="success">
				Buy Now
			</Button>
		</div>
	);
};

export default Detail;
