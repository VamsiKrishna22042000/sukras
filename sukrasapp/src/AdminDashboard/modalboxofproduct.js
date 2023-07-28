import "./index.css";

import { useState } from "react";

const Mode = (props) => {
  const [showType, setShowType] = useState(true);
  const [showCategory, setShowCategory] = useState(true);

  const {
    availableTypes,
    availableCategories,
    selectedType,
    settingType,
    settinMode,
  } = props;

  const [dataToBe, setData] = useState({
    name: "",
    type: "",
    category: "",
    price: "",
    about: "",
  });

  const addService = (event) => {
    if (event.target.id === "service-name-admin") {
      setData((prevData) => ({ ...prevData, name: event.target.value }));
    } else if (event.target.id === "service-type-product") {
      setData((prevData) => ({ ...prevData, type: event.target.value }));
    } else if (event.target.id === "service-category-product") {
      setData((prevData) => ({ ...prevData, category: event.target.value }));
    } else if (event.target.id === "service-price-admin") {
      setData((prevData) => ({ ...prevData, price: event.target.value }));
    } else if (event.target.id === "service-time-admin") {
      setData((prevData) => ({ ...prevData, time: event.target.value }));
    } else if (event.target.id === "service-about-admin") {
      setData((prevData) => ({
        ...prevData,
        about: event.target.value,
      }));
    } else if (event.target.id === "file") {
      setData((prevData) => ({ ...prevData, photos: event.target.value }));
    }
  };

  const updateToProductList = async () => {
    const fd = new FormData();

    for (var key in dataToBe) {
      fd.append(`${key}`, dataToBe[key]);
    }

    const url = `${process.env.REACT_APP_ROOT_URL}  /admin/addProduct`;

    const reqConfigure = {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(Object.fromEntries(fd.entries())),
    };

    const response = await fetch(url, reqConfigure);
    const data = await response.json();

    if (response.ok) {
      console.log(data);
    }
  };

  return (
    <>
      <div className="modal-boxcon"></div>
      <form className="modal-box">
        <h1 style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}>
          Add New Product
        </h1>
        <lable htmlFor="service-name-admin">Product Title</lable>
        <input
          onChange={addService}
          className="service-admin-input"
          id="service-name-admin"
          type="text"
        />
        {showType && (
          <label htmlFor="service-type-product">
            Select Type of the product
          </label>
        )}
        {showType && (
          <select
            style={{ textTransform: "capitalize" }}
            id="service-type-product"
            className="service-admin-input"
            onChange={(event) => {
              settingType(event);
              addService(event);
            }}
          >
            {availableTypes.map((each) => (
              <option
                selected={selectedType === each ? true : false}
                style={{ textTransform: "capitalize" }}
                id={each._id}
              >
                {each}
              </option>
            ))}
          </select>
        )}
        {showCategory && (
          <label htmlFor="service-category-product">
            Select Category of the product
          </label>
        )}
        {showCategory && (
          <select
            style={{ textTransform: "capitalize" }}
            id="service-category-product"
            className="service-admin-input"
            onChange={addService}
          >
            {availableCategories.map((each) => (
              <option style={{ textTransform: "capitalize" }} id={each}>
                {each}
              </option>
            ))}
          </select>
        )}
        {!showType && (
          <button
            onClick={() => {
              setShowType(true);
              setShowCategory(true);
            }}
            type="button"
            className="service-button-admin-category1"
          >
            Click here to get available Type & Categories back
          </button>
        )}
        {!showCategory && (
          <button
            onClick={() => {
              setShowCategory(true);
            }}
            type="button"
            className="service-button-admin-category1"
          >
            Click here to get available Categories back
          </button>
        )}

        <lable htmlFor="service-price-admin">Product Price</lable>
        <input
          className="service-admin-input"
          id="service-price-admin"
          type="text"
          onChange={addService}
        />
        <lable htmlFor="service-description-admin">
          Describe about product
        </lable>
        <textarea
          onChange={addService}
          className="service-admin-text-area-product"
          id="service-about-admin"
          type="text"
        />
        <label htmlFor="service-image-admin">Upload Image for product</label>
        <input id="file" onChange={addService} type="file" />
        <div className="service-button-admin-con">
          <button
            className="service-button-admin"
            type="button"
            onClick={updateToProductList}
          >
            Add
          </button>
          <button
            className="service-button-admin"
            onClick={() => {
              settinMode();
            }}
            type="button"
          >
            close
          </button>
        </div>
        <form className="modal-box2">
          <h1 style={{ margin: 0, color: "#3E3E3E", fontSize: 20 }}>
            Add New Type
          </h1>
          <p>New Type name</p>
          <input
            id="service-type-product"
            onFocusCapture={() => {
              setShowType(false);
            }}
            onFocus={() => {
              setShowCategory(false);
            }}
            onChange={addService}
            type="text"
          />

          <p style={{ color: "red", fontSize: 10 }}>
            *Please add Type if needed else leave it blank.
          </p>
          <h1 style={{ margin: 0, color: "#3E3E3E", fontSize: 20 }}>
            Add New Category
          </h1>
          <p>New category name</p>
          <input
            id="service-category-product"
            onFocusCapture={() => {
              setShowCategory(false);
            }}
            onChange={addService}
            type="text"
          />

          <p style={{ color: "red", fontSize: 10 }}>
            *Please add category if needed else leave it blank.
          </p>
        </form>
      </form>
    </>
  );
};
export default Mode;
