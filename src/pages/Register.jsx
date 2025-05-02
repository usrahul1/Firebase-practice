import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const firebase = useFirebase();
	console.log(firebase);

	const navigate = useNavigate();

	useEffect(() => {
		if (firebase.isLoggedIn) navigate("/");
	}, [firebase, navigate]);

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await firebase.signUpUser(email, pass);
		console.log(res);
	};

	return (
		<div className="container mt-5">
			{" "}
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						type="email"
						placeholder="Enter email"
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						onChange={(e) => setPass(e.target.value)}
						value={pass}
						type="password"
						placeholder="Password"
					/>
				</Form.Group>
				<Button onClick={handleSubmit} variant="primary" type="submit">
					Create Account
				</Button>
			</Form>
		</div>
	);
};

export default Register;
