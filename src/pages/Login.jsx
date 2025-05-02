import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

const Login = () => {
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
		const res = await firebase.signInUser(email, pass);
		console.log("success", res);
	};

	return (
		<div className="container mt-5">
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						type="email"
						placeholder="Enter email"
					/>
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
					Sign In
				</Button>
			</Form>
			<h1 className="mt-5 mb-5">Or</h1>
			<Button onClick={firebase.googleSignIn} variant="danger">
				Sign in with google
			</Button>
		</div>
	);
};

export default Login;
