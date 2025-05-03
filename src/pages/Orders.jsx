import React, { useEffect } from "react";
import { useFirebase } from "../context/Firebase";

const Orders = () => {
	const firebase = useFirebase();
	useEffect(() => {
		firebase.fetchMyOrders();
	}, [firebase]);
	return <div></div>;
};

export default Orders;
