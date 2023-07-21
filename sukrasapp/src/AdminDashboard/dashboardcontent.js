import "./index.js";
import Maindashboard from "./maindashboard.js";

import Customers from "./customers.js";

import Services from "./services.js";

import Products from "./products.js";

import Appointments from "./appointments.js";

import Orders from "./orders.js";

import Events from "./events.js";

const DashboardContent = (props) => {
  const { selectedDashboard } = props;

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div className="header-content">
          <p style={{ marginBottom: 0 }}>Hello,</p>
          <h1 style={{ marginTop: 5, color: "#4e4e4e", fontSize: 20 }}>
            ION Sravan
          </h1>
        </div>
        <div className="header-content">
          <p style={{ marginBottom: 0 }}>User</p>
          <h1 style={{ marginTop: 5, color: "#4e4e4e", fontSize: 20 }}>
            Administrator
          </h1>
        </div>
        <div className="header-content">
          <p style={{ marginBottom: 0 }}>Last Login</p>
          <h1 style={{ marginTop: 5, color: "#4e4e4e", fontSize: 20 }}>
            15/07/2023 - 03:23 Pm
          </h1>
        </div>
        <div className="header-icons-dashboard">
          <button className="header-notify-btn" type="button">
            <img
              className="header-icons"
              src="/bell-notification.png"
              alt="notification"
            />
          </button>
          <button className="header-notify-btn" type="button">
            <img className="header-icons" src="/user.png" alt="notification" />
          </button>
        </div>
      </div>
      {selectedDashboard === "Dashboard" ? (
        <Maindashboard />
      ) : selectedDashboard === "Customers" ? (
        <Customers />
      ) : selectedDashboard === "Appointments" ? (
        <Appointments />
      ) : selectedDashboard === "Services" ? (
        <Services />
      ) : selectedDashboard === "Products" ? (
        <Products />
      ) : selectedDashboard === "Orders" ? (
        <Orders />
      ) : (
        <Events />
      )}
    </div>
  );
};
export default DashboardContent;
