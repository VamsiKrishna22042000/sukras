import "./index.css";

import { useState, useEffect } from "react";

const Maindashboard = () => {
  const [dashboarddata, setDashboardData] = useState([]);

  /*useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}api/admin/dashBoardDetaiils`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      console.log(data);
    }
  };*/

  return (
    <div className="dashboard-component">
      <div className="dashboard-data">
        <div className="dashboard-data-content">
          <div className="dash-board-img-con">
            <img
              src="/dashboard-orders.png"
              className="dash-board-data-img"
              alt="dashboard-icons"
            />
          </div>
          <div className="dashboard-data-numbers">
            <h1 style={{ margin: 0, color: "#4e4e4e" }}>125</h1>
            <p style={{ margin: 0, paddingLeft: 5 }}>Orders</p>
          </div>
        </div>
        <div className="dashboard-data-content">
          <div className="dash-board-img-con">
            <img
              src="/dashboard-customers.png"
              className="dash-board-data-img"
              alt="dashboard-icons"
            />
          </div>
          <div className="dashboard-data-numbers">
            <h1 style={{ margin: 0, color: "#4e4e4e" }}>125</h1>
            <p style={{ margin: 0, paddingLeft: 5 }}>Customers</p>
          </div>
        </div>
        <div className="dashboard-data-content">
          <div className="dash-board-img-con">
            <img
              src="/dashboard-services.png"
              className="dash-board-data-img"
              alt="dashboard-icons"
            />
          </div>
          <div className="dashboard-data-numbers">
            <h1 style={{ margin: 0, color: "#4e4e4e" }}>125</h1>
            <p style={{ margin: 0, paddingLeft: 5 }}>Services</p>
          </div>
        </div>
        <div className="dashboard-data-content">
          <div className="dash-board-img-con">
            <img
              src="/dashboard-products.png"
              className="dash-board-data-img"
              alt="dashboard-icons"
            />
          </div>
          <div className="dashboard-data-numbers">
            <h1 style={{ margin: 0, color: "#4e4e4e" }}>125</h1>
            <p style={{ margin: 0, paddingLeft: 5 }}>Products</p>
          </div>
        </div>
        <div className="dashboard-data-content">
          <div className="dash-board-img-con">
            <img
              src="/dashboard-events.png"
              className="dash-board-data-img"
              alt="dashboard-icons"
            />
          </div>
          <div className="dashboard-data-numbers">
            <h1 style={{ margin: 0, color: "#4e4e4e" }}>125</h1>
            <p style={{ margin: 0, paddingLeft: 5 }}>Events</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maindashboard;
