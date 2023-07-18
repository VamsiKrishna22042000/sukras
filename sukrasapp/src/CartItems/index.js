import "./index.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import { v4 as uuidv4 } from "uuid";

import moment from "moment";

import { TailSpin } from "react-loader-spinner";

import { useState, useEffect } from "react";

import Cookies from "js-cookie";

const CartItems = (props) => {
  const { updateProgress, cartItemsArr, getCartItems, TotalPrice, discount } =
    props;

  const pageStage = {
    loading: "LOADING",
    success: "SUCCESS",
  };

  const formatdate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const generateDateRange = (startDate) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(startDate.clone().add(i, "days"));
    }
    return dates;
  };

  const currentDate = moment(); // Get the current date
  const dateRange = generateDateRange(currentDate); // Generate the initial date range

  // Helper function to generate the date range

  function getCurrentTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours > 12 ? hours - 12 : hours;
    const timeString = `${formattedHours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`;
    return timeString;
  }

  const [cartArr, setCartArr] = useState([]);

  const [displayArr, setDisplayArray] = useState([]);

  const [ArrayWithTime, setArrayWithTime] = useState([]);

  const [stage, setStage] = useState(pageStage.loading);

  useEffect(() => {
    setCartArr([]);
    setCartArr([...cartItemsArr]);
  }, []);

  const sendUpdate = () => {
    if (ArrayWithTime.length === displayArr.length) {
      let timeObtained = "";
      ArrayWithTime.map((each) => {
        if (each.time === "") {
          timeObtained = each.service;
          toast.error(`Select Time for ${each.service}`, {
            theme: "colored",
            position: "top-center",
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
          });
        }
      });

      if (timeObtained === "") {
        updateProgress(["Payment", ArrayWithTime]);
      }
    } else if (ArrayWithTime.length < displayArr.length) {
      toast.error(`Select Date and Time for each the services in Cart`, {
        theme: "colored",
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
      });
    }
  };

  const deleteServiceFromCart = async (event) => {
    const url = "https://sukras.onrender.com/api/salon/deleteServiceFromCart";

    const details = {
      userId: Cookies.get("jwt_user"),
      cartId: event.target.id,
    };

    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(details),
    };

    const response = await fetch(url, options);
    /*console.log(response)*/

    getCartItems();
    const filteredArr = displayArr.map((each) => {
      if (each._id !== event.target.id) {
        return each;
      }
    });

    setDisplayArray([]);
    filteredArr.map((each) => {
      if (each !== undefined) {
        setDisplayArray((prevDis) => [...prevDis, each]);
      }
    });

    const TimeId = displayArr.filter((each) => each._id === event.target.id);
    const filterTimeArr = ArrayWithTime.filter(
      (each) => each.timeId !== TimeId[0].timeId
    );
    setArrayWithTime(filterTimeArr);
  };

  const sendDates = (dates) => {
    return dateRange.map((date) => (
      <option
        selected={dates === formatDate(date) ? true : false}
        key={formatDate(date)}
        value={formatDate(date)}
      >
        {formatDate(date)}
      </option>
    ));
  };

  const getAvailableSlots = (booked) => {
    const timesAvailable = [
      "10:00",
      "11:00",
      "12:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
    ];

    if (booked.length === 0) {
      return timesAvailable;
    } else {
      const currentTime = getCurrentTime();
      const notBookedSlots = timesAvailable.filter(
        (each) => !booked.includes(each)
      );
      const curretTimeFilter = notBookedSlots.filter(
        (each) => each > currentTime
      );

      return notBookedSlots;
    }
  };

  useEffect(() => {
    cartArr.map(async (each) => {
      const url = "https://sukras.onrender.com/api/salon/getAllBookedSlots";

      const getSlots = {
        salonId: "64a2bac3ec45bcb4034bdd46",
        serviceId: each.serviceId,
        date: formatdate(new Date(moment()._d)),
      };

      const reqConfigure = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(getSlots),
      };

      const response = await fetch(url, reqConfigure);
      const data = await response.json();
      if (response.ok) {
        setDisplayArray((prevDisplay) => [
          ...prevDisplay,
          {
            ...each,
            date: formatDate(moment()._d),
            time: "",
            timeId: uuidv4(),
            availableSlots: getAvailableSlots(data.bookedSlots),
          },
        ]);
      }
    });
  }, [cartArr]);

  useEffect(() => {
    setStage(pageStage.success);
  }, [displayArr]);

  const setDatesSelected = (event) => {
    const { id, value } = event.target;

    const promiseDisplay = displayArr.map(async (each) => {
      const { date, ...rest } = each;

      if (id === each._id) {
        const obtainedobj = await getTheTimeSlots({ date: value, ...rest });
        return obtainedobj;
      }
    });

    promiseDisplay.map((each) =>
      each.then((result) => {
        if (result !== undefined) {
          setDisplayArray([]);
          displayArr.map((each) => {
            if (each._id === result._id) {
              setDisplayArray((prevDis) => [...prevDis, result]);
            } else {
              setDisplayArray((prevDis) => [...prevDis, each]);
            }
          });
        }
      })
    );
    const sendto = displayArr.filter((each) => each._id === event.target.id);
    setTimesSelected([sendto[0].timeId, sendto[0].time, value]);
  };

  const setTimesSelected = (event) => {
    const idSent = event.length !== undefined ? event[0] : event.target.id;
    const timeSent = event.length !== undefined ? event[1] : event.target.value;
    const sentdate = event.length !== undefined && event[2];

    if (event.length === undefined) {
      /*console.log("hi")*/
      const includes = ArrayWithTime.filter((each) => each.timeId === idSent);
      if (includes[0] !== undefined) {
        ArrayWithTime.map((eachI) => {
          const { time, ...rest } = eachI;
          if (eachI.timeId === idSent) {
            const filteredArrObj = ArrayWithTime.filter(
              (each) => each.timeId !== idSent
            );
            /*console.log(filteredArrObj)*/
            setArrayWithTime([...filteredArrObj, { time: timeSent, ...rest }]);
          } else {
            setArrayWithTime((prevT) => [...prevT]);
          }
        });
      } else if (ArrayWithTime.length >= displayArr.length) {
        const updatedArray = ArrayWithTime.map((eachItem) => {
          if (eachItem.timeId === idSent) {
            const filteredArr = displayArr.map((each) => {
              const { time, ...rest } = each;
              if (each.timeId === idSent) {
                return { time: timeSent, ...rest };
              }
            });
            const filteredObj = filteredArr.filter(
              (each) => each !== undefined
            );
            return filteredObj[0];
          } else {
            return eachItem;
          }
        });
        setArrayWithTime(updatedArray);
      } else {
        displayArr.map((each) => {
          const { time, ...rest } = each;
          if (each.timeId === idSent) {
            setArrayWithTime((prevTimeArr) => [
              ...prevTimeArr,
              { ...rest, time: timeSent },
            ]);
          }
        });
      }
    } else {
      /*console.log("hello")*/
      if (ArrayWithTime.length >= displayArr.length) {
        const updatedArray = ArrayWithTime.map((eachItem) => {
          if (eachItem.timeId === idSent) {
            const filteredArr = displayArr.map((each) => {
              const { time, date, ...rest } = each;
              if (each.timeId === idSent) {
                return { time: timeSent, date: sentdate, ...rest };
              }
            });
            const filteredObj = filteredArr.filter(
              (each) => each !== undefined
            );
            return filteredObj[0];
          } else {
            return eachItem;
          }
        });
        setArrayWithTime(updatedArray);
      } else {
        displayArr.map((each) => {
          const { time, date, ...rest } = each;
          if (each.timeId === idSent) {
            setArrayWithTime((prevTimeArr) => [
              ...prevTimeArr,
              { ...rest, date: sentdate, time: timeSent },
            ]);
          }
        });
      }
    }
  };

  const getTheTimeSlots = async (obj) => {
    const { date, image, price, service, _id, time, timeId, serviceId } = obj;

    const url = "https://sukras.onrender.com/api/salon/getAllBookedSlots";

    const tobeSent = {
      salonId: "64a2bac3ec45bcb4034bdd46",
      serviceId: serviceId,
      date: formatdate(new Date(date)),
    };

    /*console.log(tobeSent)*/
    const detials = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tobeSent),
    };

    const response = await fetch(url, detials);
    const data = await response.json();

    if (response.ok) {
      /*console.log(data)*/
      return {
        date,
        image,
        price,
        serviceId,
        service,
        _id,
        time: "",
        timeId,
        availableSlots: getAvailableSlots(data.bookedSlots),
      };
    }
  };

  const notify = () =>
    toast.error("Deleted Item from cart!", { theme: "colored" });
  /* console.log(cartItemsArr)
    console.log(cartArr)
    console.log(displayArr)
    console.log(ArrayWithTime)*/

  return stage === pageStage.loading ? (
    <div className="loader-spinner">
      <TailSpin color={"#F4BD18"} height={70} width={70} />
    </div>
  ) : (
    <>
      <ToastContainer
        position="top-center"
        pauseOnHover
        closeOnClick
        autoClose={3000}
      />
      {displayArr.length === 0 ? (
        <div className="total-con-cartitems">
          <TailSpin color={"#F4BD18"} height={70} width={70} />
        </div>
      ) : (
        <div className="total-con-cartitems">
          {displayArr.map((each) => (
            <div className="cart-item">
              <img className="cart-img" src={each.image} alt="image-cart" />
              <div className="cart-contents">
                <p
                  style={{ textTransform: "capitalize" }}
                  className="cart-head"
                >
                  {each.service}
                </p>
                <p className="cart-head">
                  <span className="service-price">₹</span> {each.price}
                </p>
                <div className="slots-available">
                  <select
                    id={each._id}
                    onChange={setDatesSelected}
                    className="select-options1"
                  >
                    {sendDates(each.date)}
                  </select>
                  <select
                    id={each.timeId}
                    onChange={setTimesSelected}
                    className="select-options2"
                  >
                    {each.availableSlots.map((each) => (
                      <option>{each}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={deleteServiceFromCart}
                onClickCapture={notify}
                id={each._id}
                className="cart-cancel"
                type="button"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="price-details">
        <p className="price-head1">PriceDetials</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p className="actual-price">Actual Price</p>
          <p className="price1">
            <span className="actual-price">₹</span>
            {TotalPrice}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p className="total-discount">Total Discount</p>
          <p className="total-discount">
            <span className="actual-price">-₹</span>
            {discount}
          </p>
        </div>
        <div
          className="total-cart-price"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p className="total-price-head">Total</p>
          <p className="total-price-head">
            <span className="actual-price">₹</span> {TotalPrice - discount}
          </p>
        </div>
        <button onClick={sendUpdate} className="proceed-schedule" type="button">
          Proceed
        </button>
      </div>
    </>
  );
};

export default withRouter(CartItems);
