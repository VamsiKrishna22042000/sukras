import "./index.js";

import { TailSpin } from "react-loader-spinner";

import { useState, useEffect } from "react";

const Events = () => {
  const [eventServices, setEventServices] = useState([]);
  const [buttonState, setButton] = useState(false);
  const [load, setLoad] = useState(false);
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    getAllEventsServices();
  }, []);

  const getAllEventsServices = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ROOT_URL}/api//admin/getAllEventServices`
    );
    const data = await response.json();
    if (response.ok) {
      setEventServices(data.events);
      setLoad(true);
    }
  };

  const settingButton = () => {
    setButton(!buttonState);
  };

  const settingModal = () => {
    setModal(!showModal);
  };

  const Modal = () => {
    return (
      <>
        <div className="modal-boxcon"></div>
        <form className="modal-box3">
          <h1 style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}>
            Add New Event
          </h1>
          <lable htmlFor="service-name-admin">Event Title</lable>
          <input
            className="service-admin-input"
            id="service-name-admin"
            type="text"
            style={{ height: 25, marginBottom: 10 }}
          />
          <label htmlFor="service-image-admin">Upload Image for service</label>
          <input type="file" />
          <div className="service-button-admin-con-event">
            <button
              className="service-button-admin"
              onClick={settingModal}
              type="button"
            >
              Add
            </button>
            <button
              className="service-button-admin"
              onClick={settingModal}
              type="button"
            >
              close
            </button>
          </div>
        </form>
      </>
    );
  };

  return load ? (
    <>
      {showModal && <Modal />}
      <div className="dashboard-component2">
        <button onClick={settingModal} className="add-service" type="button">
          + Add new Event
        </button>
        <div className="avialable-products-head">
          <div className="product-checkbox"></div>
          <div className="product-image">
            <p className="product-heads">Image</p>
          </div>
          <div className="product-toggle1">
            <p className="product-heads">Toggle</p>
          </div>
          <div className="product-name">
            <p className="product-heads">Name</p>
          </div>
          <div className="product-id">
            <p className="product-heads">Id</p>
            <img src="./updown.png" className="updown" alt="updown" />
          </div>
          <div className="product-action">
            <p className="product-heads">Action</p>
            <img src="./updown.png" className="updown" alt="updown" />
          </div>
        </div>
        {eventServices.map((each) => (
          <div key={each._id} id={each._id} className="avialable-products">
            <div className="product-checkbox">
              <input type="checkbox" />
            </div>
            <div className="product-image">
              <img
                className="productimage"
                src={each.image}
                alt="productimage"
              />
            </div>
            <div id={each._id} className="product-toggle1">
              <div className={buttonState ? "toggle-con2" : "toggle-con1"}>
                <button
                  onClick={settingButton}
                  type="button"
                  className={buttonState ? "togglebutton2" : "togglebutton1"}
                ></button>
              </div>
            </div>
            <div className="product-name">
              <p style={{ textTransform: "capitalize" }}>{each.name}</p>
            </div>
            <div className="product-id">
              <p>{each._id}</p>
            </div>
            <div className="product-action">
              <div className="actions-con">
                <button className="actions-button">
                  <img className="actions-img" src="./edit.png" alt="edit" />
                </button>
                <button className="actions-button">
                  <img
                    className="actions-img"
                    src="./delete-fill.png"
                    alt="delete"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className="loader-spinner-admin">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};

export default Events;
