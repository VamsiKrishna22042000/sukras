import "./index.css";

import { TailSpin } from "react-loader-spinner";

import { useState, useEffect } from "react";

const Services = () => {
  const [load, setLoad] = useState(false);
  const [availableServices, setavailServices] = useState([]);

  const [availableCategories, setCategories] = useState([]);

  const [buttonState, setButton] = useState(false);

  const [showModal, setModal] = useState(false);

  const settingButton = () => {
    setButton(!buttonState);
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const getAllServices = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllServices`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      console.log(data.allServices);
      setavailServices(data.allServices);
      setLoad(true);
    }
  };

  const getallCategories = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllSalon`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      console.log(data.salons[0].categories);
      setCategories(data.salons[0].categories);
    }
  };

  const settingModal = () => {
    setModal(!showModal);
    getallCategories();
  };

  const Modal = () => {
    return (
      <>
        <div className="modal-boxcon"></div>
        <form className="modal-box">
          <h1 style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}>
            Add New Service
          </h1>
          <lable htmlFor="service-name-admin">Service Title</lable>
          <input
            className="service-admin-input"
            id="service-name-admin"
            type="text"
          />
          <label htmlFor="service-category-admin">
            Select Category of the service
          </label>
          <select
            style={{ textTransform: "capitalize" }}
            id="service-category-admin"
            className="service-admin-input"
          >
            {availableCategories.map((each) => (
              <option style={{ textTransform: "capitalize" }} id={each._id}>
                {each.category}
              </option>
            ))}
          </select>
          <lable htmlFor="service-price-admin">Service Price</lable>
          <input
            className="service-admin-input"
            id="service-price-admin"
            type="text"
          />
          <lable htmlFor="service-time-admin">Service Time</lable>
          <input
            className="service-admin-input"
            id="service-time-admin"
            type="text"
          />
          <lable htmlFor="service-description-admin">
            Describe about service
          </lable>
          <textarea
            className="service-admin-text-area"
            id="service-description-admin"
            type="text"
          />
          <label htmlFor="service-image-admin">Upload Image for service</label>
          <input type="file" />
          <div className="service-button-admin-con">
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
          <form className="modal-box2">
            <h1 style={{ margin: 0, color: "#3E3E3E", fontSize: 20 }}>
              Add New Category
            </h1>
            <p>New category name</p>
            <input type="text" />
            <button type="button" className="service-button-admin-category">
              Add Category
            </button>
            <p style={{ color: "red", fontSize: 10 }}>
              *Please add category if needed else leave it blank.
            </p>
          </form>
        </form>
      </>
    );
  };

  return load ? (
    <>
      {showModal && <Modal />}
      <div className="dashboard-component2">
        <button onClick={settingModal} className="add-service" type="button">
          + Add new service
        </button>
        <div className="avialable-products-head">
          <div className="product-checkbox"></div>
          <div className="product-image">
            <p className="product-heads">Image</p>
          </div>
          <div className="product-toggle">
            <p className="product-heads">Toggle</p>
          </div>
          <div className="product-name">
            <p className="product-heads">Name</p>
          </div>
          <div className="product-toggle">
            <p className="product-heads">Price</p>
          </div>
          <div className="product-category">
            <p className="product-heads">Category</p>
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
        {availableServices.map((each) => (
          <div key={each._id} id={each._id} className="avialable-products">
            <div className="product-checkbox">
              <input type="checkbox" />
            </div>
            <div className="product-image">
              <img
                className="productimage"
                src={each.image[0]}
                alt="serviceimage"
              />
            </div>
            <div id={each._id} className="product-toggle">
              <div className={buttonState ? "toggle-con2" : "toggle-con1"}>
                <button
                  onClick={settingButton}
                  type="button"
                  className={buttonState ? "togglebutton2" : "togglebutton1"}
                ></button>
              </div>
            </div>
            <div className="product-name">
              <p style={{ textTransform: "capitalize" }}>{each.service}</p>
            </div>
            <div id={each._id} className="product-toggle">
              <p style={{ textTransform: "capitalize" }}>₹ {each.price}</p>
            </div>
            <div className="product-category">
              <p style={{ textTransform: "capitalize" }}>{each.category}</p>
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
export default Services;
