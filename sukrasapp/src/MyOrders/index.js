import Cookies from "js-cookie";
import "./index.css";

import { useEffect, useState } from "react";

const MyOrders = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    const response = await fetch(
      `https://sukras.onrender.com/api/orders/allOrders/${Cookies.get(
        "jwt_user"
      )}`
    );
    const data = await response.json();
    if (response.ok) {
      console.log(data);
    }
  };

  const gobackTo = () => {
    const { history, match } = props;
    const { params } = match;
    history.replace(`/${params.zone}`);
  };

  return (
    <div className="total-orders">
      <div className="myorders-head">
        <button onClick={gobackTo} className="order-arrow-btn" type="button">
          <img className="order-left-arrow-mobile" src="/backarrow.png" />
        </button>
        <h1>My Orders</h1>
      </div>
      <h1 style={{ marginLeft: 25, color: "#3E3E3E" }}>Services</h1>
      <div className="all-orders">
        <div className="each-order">
          <img
            className="each-img"
            src="/beautyzone1.png"
            alt="your services"
          />
          <div className="each-content">
            <h1>Hair Cut</h1>
            <p>299</p>
            <p>30/4/2023</p>
          </div>
        </div>
      </div>
      <h1 style={{ marginLeft: 25, color: "#3E3E3E" }}>Products</h1>
      <div className="all-orders">
        <div className="each-order">
          <img
            className="each-img"
            src="/beautyzone1.png"
            alt="your services"
          />
          <div className="each-content">
            <h1 style={{ marginTop: 2, marginBottom: 0 }}>Hair Cut</h1>
            <p>299</p>
            <p>30/4/2023</p>
            <p>{`5 ordered`}</p>
          </div>
        </div>
      </div>
      <h1 style={{ marginLeft: 25, color: "#3E3E3E" }}>Events</h1>
      <div className="all-orders">
        <div className="each-order">
          <img
            className="each-img"
            src="/beautyzone1.png"
            alt="your services"
          />
          <div className="each-content">
            <h1 style={{ marginTop: 5 }}>Hair Cut</h1>
            <p>30/4/2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
