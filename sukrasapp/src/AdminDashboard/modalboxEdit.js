import { useState } from "react";
import "./index.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TailSpin } from "react-loader-spinner";

const ModalBoxEdit = (props) => {
  const {
    availableServices,
    setEditModelFunc,
    serviceTobeEdited,
    getAllServices,
  } = props;

  const [loading, setLoad] = useState(true);

  const filteredService = availableServices.filter(
    (each) => each._id === serviceTobeEdited
  );

  const [demoedit, demosetData] = useState({
    salonId: "64c1e5b880e7fc21fb096a71",
    serviceId: serviceTobeEdited,
    category: filteredService[0].category,
    service: filteredService[0].service,
    availableSlotCount: filteredService[0].availableSlotCount,
    price: filteredService[0].price,
    time: filteredService[0].time,
    description: filteredService[0].description,
    photos: filteredService[0].image,
  });

  const [edit, setData] = useState({
    salonId: "64c1e5b880e7fc21fb096a71",
    serviceId: serviceTobeEdited,
    category: filteredService[0].category,
    service: filteredService[0].service,
    availableSlotCount: filteredService[0].availableSlotCount,
    price: filteredService[0].price,
    time: filteredService[0].time,
    description: filteredService[0].description,
    photos: filteredService[0].image,
  });

  const addService = (event) => {
    if (event.target.id === "service-name-admin") {
      setData((prevData) => ({ ...prevData, service: event.target.value }));
    } else if (event.target.id === "service-slot-admin") {
      setData((prevData) => ({
        ...prevData,
        availableSlotCount: event.target.value,
      }));
    } else if (event.target.id === "service-category-admit") {
      setData((prevData) => ({ ...prevData, category: event.target.value }));
    } else if (event.target.id === "service-price-admin") {
      setData((prevData) => ({ ...prevData, price: event.target.value }));
    } else if (event.target.id === "service-time-admin") {
      setData((prevData) => ({ ...prevData, time: event.target.value }));
    } else if (event.target.id === "service-description-admin") {
      setData((prevData) => ({
        ...prevData,
        description: event.target.value,
      }));
    } else if (event.target.id === "file") {
      setData((prevData) => ({ ...prevData, photos: event.target.files[0] }));
    }
  };

  const updatingServices = () => {
    setLoad(false);
    const sendEditedData = async () => {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/salon/editService`;

      const reqConfigure = {
        method: "PUT",
        body: fd,
      };

      const response = await fetch(url, reqConfigure);

      if (response.ok) {
        toast.success("Successfully Edited", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
        setLoad(true);
        setEditModelFunc();
        getAllServices();
      }
    };

    const fd = new FormData();

    if (edit.category !== demoedit.category) {
      fd.append("category", edit.category);
    }
    if (edit.service !== demoedit.service) {
      fd.append("service", edit.service);
    }
    if (edit.availableSlotCount !== demoedit.availableSlotCount) {
      fd.append("availableSlotCount", edit.availableSlotCount);
    }
    if (edit.price !== demoedit.price) {
      fd.append("price", edit.price);
    }
    if (edit.time !== demoedit.time) {
      fd.append("time", edit.time);
    }
    if (edit.description !== demoedit.description) {
      fd.append("description", edit.description);
    }
    if (edit.photos !== demoedit.photos) {
      fd.append("photos", edit.photos);
    }

    const editedData = Object.fromEntries(fd.entries());
    let count = 0;

    for (var len in editedData) {
      count = count + 1;
    }

    if (count > 0) {
      fd.append("salonId", "64c1e5b880e7fc21fb096a71");
      fd.append("serviceId", `${serviceTobeEdited}`);
      sendEditedData();
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="modal-boxcon"></div>
      {loading ? (
        <form className="modal-box">
          <h1 style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}>
            Edit Service
          </h1>
          <lable htmlFor="service-name-admin">Service Title</lable>
          <input
            style={{ textTransform: "capitalize" }}
            className="service-admin-input"
            id="service-name-admin"
            type="text"
            value={edit.service}
            onChange={addService}
          />
          <lable htmlFor="service-name-admin">Available Slot count</lable>
          <input
            value={edit.availableSlotCount}
            className="service-admin-input"
            id="service-slot-admin"
            type="number"
            onChange={addService}
          />

          <label htmlFor="service-category-admit">
            Edit Category of Service
          </label>
          <input
            style={{ textTransform: "capitalize" }}
            value={edit.category}
            id="service-category-admit"
            className="service-admin-input"
            onChange={addService}
          />
          <lable htmlFor="service-price-admin">Service Price</lable>
          <input
            value={edit.price}
            className="service-admin-input"
            id="service-price-admin"
            type="text"
            onChange={addService}
          />
          <lable htmlFor="service-time-admin">Service Time</lable>
          <input
            value={edit.time}
            className="service-admin-input"
            id="service-time-admin"
            type="text"
            onChange={addService}
          />
          <lable htmlFor="service-description-admin">
            Describe about service
          </lable>
          <textarea
            style={{ textTransform: "capitalize" }}
            value={edit.description}
            className="service-admin-text-area"
            id="service-description-admin"
            type="text"
            onChange={addService}
          />
          <label
            style={{ marginTop: 10, marginBottom: 10 }}
            htmlFor="service-image-admin"
          >
            Upload Image for service
          </label>
          <input onChange={addService} id="file" type="file" />
          <div className="service-button-admin-con">
            <button
              onClick={updatingServices}
              className="service-button-admin"
              type="button"
            >
              Edit
            </button>
            <button
              className="service-button-admin"
              onClick={() => {
                setEditModelFunc();
              }}
              type="button"
            >
              close
            </button>
          </div>
        </form>
      ) : (
        <div className="modal-box">
          <div className="spinner-edit">
            <TailSpin color={"#F4BD18"} height={70} width={70} />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalBoxEdit;
