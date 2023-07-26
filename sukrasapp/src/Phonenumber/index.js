import "./index.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { ToastContainer, toast } from "react-toastify";

import ModalBox from "./modalbox.js";

import { useState } from "react";

const Phonenumber = (props) => {
  const { phone, phonenumber, getOTP } = props;

  const [show, setShow] = useState(false);

  const settingShow = () => {
    setShow(!show);
  };

  const sendNumber = (value) => {
    phonenumber(value);
  };

  const sendOTP = async () => {
    const errorMsg = document.getElementById("error-message");
    if (phone.length >= 12) {
      errorMsg.classList.add("error-disable");

      const url = `${process.env.REACT_APP_ROOT_URL}/api/otp/otpLogin`;

      const opitons = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          mobileNumber: phone.slice(2, phone.length + 1),
        }),
      };

      const response = await fetch(url, opitons);
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        getOTP(1);
      }
    } else {
      console.log("error");
      errorMsg.classList.remove("error-disable");
    }
  };

  return (
    <>
      <ToastContainer />
      {show && <ModalBox settingShow={settingShow} />}
      <PhoneInput
        placeholder="Mobile number"
        className="phone-input"
        country={"in"}
        value={phone}
        onChange={sendNumber}
      />
      <p id="error-message" className="error-number error-disable">
        *Enter a valid number
      </p>
      <button
        className={phone.length <= 3 ? "otp" : "otp-2"}
        type="button"
        onClick={sendOTP}
      >
        Get OTP
      </button>
      <p className="signUp-phoneno">
        If not registered click
        <span
          onClick={settingShow}
          style={{ color: "#FFC300", cursor: "pointer" }}
        >
          {" "}
          SignUP
        </span>
      </p>
    </>
  );
};
export default Phonenumber;
