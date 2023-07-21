import "./index.css";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const options = [
  {
    imgUrl: "Dashboard-icon.png",
    name: "Dashboard",
  },
  {
    imgUrl: "dashboard-customers.png",
    name: "Customers",
  },
  {
    imgUrl: "dashboard-appointment.png",
    name: "Appointments",
  },
  {
    imgUrl: "dashboard-services.png",
    name: "Services",
  },
  {
    imgUrl: "dashboard-products.png",
    name: "Products",
  },
  {
    imgUrl: "dashboard-orders.png",
    name: "Orders",
  },
  {
    imgUrl: "dashboard-events.png",
    name: "Events",
  },
];

const DashboardMain = (props) => {
  const { selectedDashboard, settingDashboard } = props;

  const sendSelectedOption = (event) => {
    settingDashboard(event.target.id);
  };

  return (
    <div className="dash-board">
      <img
        className="main-head-dashboard"
        src="sukraslogoadmin.png"
        alt="Dashboardlogo"
      />
      <div className="dash-board-options">
        <div className="option-dashboard1">
          <img
            className="dash-board-search"
            src="./dashboard-search.png"
            alt="dashboard-search"
          />
          <input
            id="search"
            type="search"
            className="search-dashboard"
            placeholder="Search"
          />
        </div>
        {options.map((each) => (
          <div
            onClick={sendSelectedOption}
            key={each.name}
            className={
              each.name === selectedDashboard
                ? "option-dashboard"
                : "option-dashboard2"
            }
          >
            <img
              id={each.name}
              className="icons-dashboard"
              src={each.imgUrl}
              alt="Dashboard-icon"
            />
            <p id={each.name}>{each.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default withRouter(DashboardMain);
