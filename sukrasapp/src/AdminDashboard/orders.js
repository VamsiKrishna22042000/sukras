import "./index.css";

import { useState, useEffect } from "react";

import { TailSpin } from "react-loader-spinner";

import Cookies from "js-cookie";

const Orders = () => {
  const [myorders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api/admin/appoinments`
    );
    const data = await response.json();
    if (response.ok) {
      console.log(data);
    }
  };

  return <div className="dashboard-component2">Orders</div>;
};
export default Orders;
