import "./index.css";

import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import { Link, withRouter } from "react-router-dom";

import { TailSpin } from "react-loader-spinner";

import EventManagementCarousel from "../EventManagementCarousel";

const EventHome = (props) => {
  const { settingPage, settingEvent } = props;
  const [eventServices, setEventServices] = useState([]);
  const [load, setLoad] = useState(false);
  const [displayProfile, setProfile] = useState(false);

  useEffect(() => {
    getAllEventsServices();
  }, []);

  const getAllEventsServices = async () => {
    const response = await fetch(
      "https://sukras.onrender.com/api//admin/getAllEventServices"
    );
    const data = await response.json();
    if (response.ok) {
      setEventServices(data.events);
      setLoad(true);
    }
  };

  const sendPage = (event) => {
    settingEvent(event.target.getAttribute("program"));
    settingPage(event.target.id);
  };

  const gobackTo = () => {
    const { history } = props;
    history.push("/select-category");
  };

  const deleteCookie = () => {
    /* deleteCookie was integrated with both searchIcons*/
    Cookies.remove("jwt_token");
    Cookies.remove("jwt_user");
  };

  const settingProfile = () => {
    setProfile(!displayProfile);
  };

  /*console.log(eventServices)*/ return load ? (
    <>
      <div className="sukras-header-fashionzone">
        <img
          className="sukraslogobeauty"
          src="./sukraslogo.png"
          alt="Logo Space"
        />
        <button onClick={gobackTo} className="arrow-btn" type="button">
          <img className="left-arrow-mobile" src="./backarrow.png" />
        </button>
        <button className="location-btnn" type="button">
          <img className="location-mobilee" src="./location-icon.png" />
        </button>
        <select className="dropdown-container">
          <option>Hyderabad</option>
        </select>
        <button
          onClick={deleteCookie}
          className="search-btn-fashion"
          type="button"
        >
          <img className="search-mobile" src="./search-mobile.png" />
        </button>
        <button className="notification-btnn" type="button">
          <img
            className="notification-mobile"
            src="./notification-mobile.png"
          />
        </button>
        <button className="user-btn" type="button">
          <img className="user" src="./user.png" />
        </button>
        <button
          onClick={settingProfile}
          className="arrowdown-btn"
          type="button"
        >
          <img className="arrow" src="./arrowdown.png" />
        </button>
        <Link
          to={`/myorders/myorders/myorders/eventManagement`}
          className={displayProfile ? "profile-block2" : "profile-display"}
        >
          <p>My Orders</p>
        </Link>
        <div className="search-cart">
          <input
            className="serch-cart-input"
            placeholder="Enter keywords, title, author or ISBN "
            type="search"
          />
          <button onClick={deleteCookie} className="search-icon-button">
            <img
              src="./search-icon.png"
              alt="search-icon"
              className="search-icon"
            />
          </button>
        </div>
      </div>
      <div className="sukras-main-beauty">
        <div className="beautyzone-body">
          <EventManagementCarousel />
        </div>
        <div className="event-points">
          <h1>You know events,we know you</h1>
          <p>
            Managing & booking events is stressful, here we help you to <br />{" "}
            book venue within minutes
          </p>
          <div className="points-con">
            <img className="pointImg" src="./points.png" />
            <p>Best of deals onLY ON Sukra’sBest of deals only on Sukra’s</p>
          </div>
          <div className="points-con">
            <img className="pointImg" src="./points.png" />
            <p>Get resaonable rates</p>
          </div>
          <div className="points-con">
            <img className="pointImg" src="./points.png" />
            <p>Easy to book an event</p>
          </div>
          <div className="points-con">
            <img className="pointImg" src="./points.png" />
            <p>Just one click and book an event</p>
          </div>
        </div>
      </div>
      <div className="beautyzone-body-2">
        {eventServices === "" ? (
          <div className="service-spinner">
            <TailSpin color={"#F4BD18"} height={70} width={70} />
          </div>
        ) : (
          <div className="our-services">
            <p className="our-services-head">Our Event Services</p>
            {eventServices.map((each) => (
              <button
                onClick={sendPage}
                key={each._id}
                className="event-our-services-btn"
                id={each.name}
                type="button"
              >
                <img
                  program={each._id}
                  id={each.name}
                  className="our-services-img"
                  src={`${each.image}`}
                  alt={each.name}
                />
                <p
                  style={{ textTransform: "capitalize" }}
                  className="event-our-services-name"
                >
                  {each.name}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  ) : (
    <div className="service-spinner">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};
export default withRouter(EventHome);
