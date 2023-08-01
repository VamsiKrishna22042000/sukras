import "./index.css";

import { TailSpin } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ModalBoxEdit from "./modalboxEdit";

import { useState, useEffect } from "react";

const Services = () => {
  const [load, setLoad] = useState(false);
  const [availableServices, setavailServices] = useState([]);

  const [availableCategories, setCategories] = useState([]);

  const [showModal, setModal] = useState(false);

  const [showServiceCategory, setServiceCategory] = useState(true);

  const [showDeleteModal, setDeleteModal] = useState(false);

  const [serviceTobeDeleted, setServiceToDelete] = useState("");

  const [showEditModal, setEditModel] = useState(false);

  const [serviceTobeEdited, setServiceToEdit] = useState("");

  const [toggleUser, setToggleUser] = useState("");

  const [editedService, setEditedService] = useState({
    salonId: "64c1e5b880e7fc21fb096a71",
    serviceId: serviceTobeEdited,
    category: "",
    service: "",
    availableSlotCount: "",
    price: "",
    time: "",
    description: "",
    image: "",
  });

  const edittingService = () => {};

  useEffect(() => {
    getAllServices();
  }, []);

  const getAllServices = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllServices`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      /*console.log(data.allServices);*/
      setavailServices(data.allServices);
      setLoad(true);
    }
  };

  const getallCategories = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllSalon`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      /*console.log(data.salons[0].categories);*/
      setCategories(data.salons[0].categories);
    }
  };

  const settingModal = () => {
    setModal(!showModal);
    getallCategories();
  };

  const Modal = () => {
    const [load, setLoad] = useState(true);

    const [dataToBe, setData] = useState({
      salonId: "64c1e5b880e7fc21fb096a71",
      category: "",
      service: "",
      availableSlotCount: "",
      price: "",
      time: "",
      description: "",
      photos: "",
      image: "",
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
      } else if (event.target.id === "file-image") {
        setData((prevData) => ({ ...prevData, image: event.target.files[0] }));
      }
    };

    const updatingServices = async () => {
      setLoad(false);
      if (dataToBe.service === "") {
        toast.error("Please Enter your service", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.availableSlotCount === "") {
        toast.error("Please Enter Available Slots count", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.category === "") {
        toast.error("Please Select Category or Add New Category", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.price === "") {
        toast.error("Please Enter Price", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.time === "") {
        toast.error("Please Enter Time of Service", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.description === "") {
        toast.error("Please Describe About service", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else if (dataToBe.photos === "") {
        toast.error("Please Upload Image for the service", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "colored",
        });
      } else {
        const filterdCategory = availableCategories.map(
          (each) => each.category
        );
        if (filterdCategory.includes(dataToBe.category)) {
          const fd = new FormData();

          for (var key in dataToBe) {
            fd.append(`${key}`, dataToBe[key]);
          }

          const url = `${process.env.REACT_APP_ROOT_URL}/api/salon/addServices`;

          const reqConfigure = {
            method: "POST",
            body: fd,
          };

          const response = await fetch(url, reqConfigure);
          const data = await response.json();

          if (response.ok) {
            setLoad(true);
            /*console.log(data);*/
            setData({
              salonId: "64c1e5b880e7fc21fb096a71",
              category: "",
              service: "",
              availableSlotCount: "",
              price: "",
              time: "",
              description: "",
              photos: "",
              image: "",
            });
            settingModal();
            getAllServices();
          }
        } else if (!filterdCategory.includes(dataToBe.category)) {
          if (dataToBe.image === "") {
            toast.error("Please Upload Image for the New category", {
              position: "top-center",
              autoClose: 2000,
              pauseOnHover: true,
              closeOnClick: true,
              theme: "colored",
            });
          } else {
            const fd = new FormData();

            for (var key in dataToBe) {
              fd.append(`${key}`, dataToBe[key]);
            }

            const url = `${process.env.REACT_APP_ROOT_URL}/api/salon/addServices`;

            const reqConfigure = {
              method: "POST",
              body: fd,
            };

            const response = await fetch(url, reqConfigure);
            const data = await response.json();

            if (response.ok) {
              setLoad(true);
              /*console.log(data);*/
              setData({
                salonId: "64c1e5b880e7fc21fb096a71",
                category: "",
                service: "",
                availableSlotCount: "",
                price: "",
                time: "",
                description: "",
                photos: "",
                image: "",
              });
              settingModal();
              getAllServices();
            }
          }
        }
      }
    };

    return (
      <>
        <ToastContainer />
        <div className="modal-boxcon"></div>
        {load ? (
          <form className="modal-box">
            <h1 style={{ marginBottom: 10, color: "#3E3E3E", fontSize: 20 }}>
              Add New Service
            </h1>
            <lable htmlFor="service-name-admin">Service Title</lable>
            <input
              onChange={addService}
              className="service-admin-input"
              id="service-name-admin"
              type="text"
            />
            <lable htmlFor="service-name-admin">Available Slot count</lable>
            <input
              onChange={addService}
              className="service-admin-input"
              id="service-slot-admin"
              type="number"
            />
            {showServiceCategory && (
              <label htmlFor="service-category-admit">
                Select Category of the service
              </label>
            )}
            {showServiceCategory && (
              <select
                style={{ textTransform: "capitalize" }}
                onChange={addService}
                id="service-category-admit"
                className="service-admin-input"
              >
                {availableCategories.map((each) => (
                  <option
                    key={each._id}
                    style={{ textTransform: "capitalize" }}
                    id={each._id}
                  >
                    {each.category}
                  </option>
                ))}
              </select>
            )}
            {!showServiceCategory && (
              <button
                onClick={() => {
                  setServiceCategory(true);
                }}
                type="button"
                className="service-button-admin-category1"
              >
                Click here to get available categories back
              </button>
            )}
            <lable htmlFor="service-price-admin">Service Price</lable>
            <input
              className="service-admin-input"
              onChange={addService}
              id="service-price-admin"
              type="text"
            />
            <lable htmlFor="service-time-admin">Service Time</lable>
            <input
              className="service-admin-input"
              onChange={addService}
              id="service-time-admin"
              type="text"
            />
            <lable htmlFor="service-description-admin">
              Describe about service
            </lable>
            <textarea
              className="service-admin-text-area"
              onChange={addService}
              id="service-description-admin"
              type="text"
            />
            <label
              style={{ marginTop: 10, marginBottom: 10 }}
              htmlFor="service-image-admin"
            >
              Upload Image for service
            </label>
            <input id="file" onChange={addService} type="file" />
            <div className="service-button-admin-con">
              <button
                onClick={updatingServices}
                className="service-button-admin"
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
              <input
                type="text"
                id="service-category-admit"
                onFocusCapture={() => {
                  setServiceCategory(false);
                }}
                onChange={addService}
              />
              <p style={{ color: "red", fontSize: 10 }}>
                *Please double click and type to add new category <br /> else
                leave it blank.
              </p>
              <label
                style={{ marginTop: 10, marginBottom: 10 }}
                htmlFor="service-image-admin"
              >
                Upload Image for category
              </label>
              <input id="file-image" onChange={addService} type="file" />
            </form>
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

  const ModalDelete = () => {
    const [loading, setLoad] = useState(true);
    const deleteService = async () => {
      setLoad(false);
      const url = `${process.env.REACT_APP_ROOT_URL}/api/salon/deleteService`;

      const requestConfigure = {
        method: "DELETE",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          salonId: "64c1e5b880e7fc21fb096a71",
          serviceId: `${serviceTobeDeleted}`,
        }),
      };

      const response = await fetch(url, requestConfigure);
      if (response.ok) {
        setLoad(true);
        getAllServices();
        setDeleteModal(false);
      }
    };

    return (
      <>
        <div className="modal-boxcon"></div>
        {loading ? (
          <div style={{ width: 250, height: 100 }} className="modal-delete">
            <p style={{ fontSize: 20 }}>
              Are you sure you want to delete service ?
            </p>
            <div
              style={{
                width: 200,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
              }}
            >
              <button
                style={{
                  padding: 5,
                  backgroundColor: "#ffc720",
                  color: "#FFFFFF",
                  borderWidth: 0,
                  borderRadius: 5,
                }}
                type="button"
                onClick={() => {
                  setServiceToDelete("");
                  setDeleteModal(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={deleteService}
                style={{
                  padding: 5,
                  backgroundColor: "Red",
                  color: "#FFFFFF",
                  borderWidth: 0,
                  borderRadius: 5,
                }}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div style={{ width: 250, height: 100 }} className="modal-delete">
            <div className="spinner-edit">
              <TailSpin color={"#F4BD18"} height={50} width={50} />
            </div>
          </div>
        )}
      </>
    );
  };

  const toggle = async (event) => {
    setToggleUser(event.target.id);
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/salon/serviceToggle`;

    const reqConfigure = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        salonId: "64c1e5b880e7fc21fb096a71",
        serviceId: `${event.target.id}`,
      }),
    };

    const response = await fetch(url, reqConfigure);

    const data = await response.json();
    if (response.ok) {
      setToggleUser("");
      getAllServices();
    }
  };

  return load ? (
    <>
      {showModal && <Modal />}
      <div className="dashboard-component2">
        <button onClick={settingModal} className="add-service" type="button">
          + Add new service
        </button>
        <div className="avialable-products-head">
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
          <div className="product-image">
            <p className="product-heads">Time</p>
          </div>
          <div className="product-action">
            <p className="product-heads">Rating</p>
          </div>
          <div className="product-image">
            <p className="product-heads">Reviews</p>
          </div>
          <div className="product-checkbox1">
            <p className="product-heads">Slots</p>
          </div>
          <div className="product-action">
            <p className="product-heads">Action</p>
            <img src="./updown.png" className="updown" alt="updown" />
          </div>
        </div>
        {availableServices.map((each) => (
          <div key={each._id} id={each._id} className="avialable-products">
            <div className="product-image">
              <img
                className="productimage"
                src={each.image[0]}
                alt="serviceimage"
              />
            </div>
            <div id={each._id} className="product-toggle">
              {each._id === toggleUser ? (
                <TailSpin color={"#F4BD18"} height={50} width={50} />
              ) : (
                <div className={each.active ? "toggle-con3" : "toggle-con4"}>
                  <button
                    id={each._id}
                    onClick={toggle}
                    type="button"
                    className={each.active ? "togglebutton2" : "togglebutton1"}
                  ></button>
                </div>
              )}
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
            <div className="product-image">
              <p className="product-heads">{each.time} min</p>
            </div>
            <div className="product-action">
              <p className="product-heads">{each.rating}</p>
            </div>
            <div className="product-image">
              <p className="product-heads">{each.reviews.length}</p>
            </div>
            <div className="product-checkbox1">
              <p className="product-heads">{each.availableSlotCount}</p>
            </div>
            <div className="product-action">
              <div className="actions-con">
                <button
                  onClick={() => {
                    setEditModel(true);
                    setServiceToEdit(each._id);
                  }}
                  className="actions-button"
                >
                  <img
                    id={each._id}
                    className="actions-img"
                    src="./edit.png"
                    alt="edit"
                  />
                </button>
                <button
                  id={each._id}
                  onClick={() => {
                    setDeleteModal(true);
                    setServiceToDelete(each._id);
                  }}
                  type="button"
                  className="actions-button"
                >
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
      {showDeleteModal && <ModalDelete />}
      {showEditModal && (
        <ModalBoxEdit
          edittingService={edittingService}
          serviceTobeEdited={serviceTobeEdited}
          availableServices={availableServices}
          getAllServices={getAllServices}
          setEditModelFunc={() => {
            setEditModel(false);
          }}
        />
      )}
    </>
  ) : (
    <div className="loader-spinner-admin">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  );
};
export default Services;
