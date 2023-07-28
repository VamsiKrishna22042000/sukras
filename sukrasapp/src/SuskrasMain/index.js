import { ToastContainer, toast } from "react-toastify";

import Cookies from "js-cookie";

import { Redirect } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import Phonenumber from "../Phonenumber";
import Verification from "../Verification";
import "./index.css";

import { useState } from "react";

const Sukras = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOTP] = useState(0);

  const phonenumber = (value) => {
    setPhone(value);
  };

  const getOTP = (OTP) => {
    setOTP(OTP);
    toast.success("Otp send successfully!", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
      closeOnClick: true,
      theme: "colored",
    });
  };

  const obtainedCookie = Cookies.get("jwt_token");
  const userCookie = Cookies.get("jwt_user");

  if (obtainedCookie !== undefined && userCookie !== undefined) {
    return <Redirect to="/" />;
  }

  return (
    <div className="sukras-main">
      <ToastContainer />
      <div className="header">
        <img className="sukras-logo" src="./sukraslogo.png" alt="Logo Space" />
      </div>
      <div className="website-body">
        <form className="form">
          <img className="sukras-logo2" src="./logo2.png" alt="Logo Space2" />
          <p className="welcome-name">Welcome to Sukra's</p>
          <p className="verify-number">Get Verified by your Mobile Number</p>
          {otp === 0 ? (
            <p className="enter-number">
              Enter your mobile number to get started.
            </p>
          ) : (
            <p className="enter-number">
              Enter the OTP sent on *********
              {phone.slice(phone.length - 2, phone.length)}
            </p>
          )}
          {otp === 0 ? (
            <Phonenumber
              phone={phone}
              phonenumber={phonenumber}
              getOTP={getOTP}
            />
          ) : (
            <Verification phone={phone} />
          )}
        </form>
      </div>
    </div>
  );
};

export default Sukras;
