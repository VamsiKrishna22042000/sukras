import "./footer.css";

import { MdLocationPin } from "react-icons/md";

import { MdPhone } from "react-icons/md";

import { MdEmail } from "react-icons/md";

import { ImEarth } from "react-icons/im";

import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io";

import { AiOutlineCopyrightCircle } from "react-icons/ai";

import { FaWhatsappSquare } from "react-icons/fa";

import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  return (
    <div className="footer-con">
      <div className="logo-con">
        <img className="footer-image" src="./logo2.png" alt="sukraslogo" />
        <div className="fotter-select">
          <p style={{ borderLeft: "hidden" }} className="footer-para">
            Home
          </p>
          <p
            style={{ borderLeft: "hidden", borderRight: "hidden" }}
            className="footer-para"
          >
            About
          </p>
        </div>
        <p style={{ fontSize: 13, marginTop: 0 }}>
          Sukras <AiOutlineCopyrightCircle style={{ fontSize: 9 }} /> 2015
        </p>
      </div>
      <div className="logo-con2">
        <div className="location-footer">
          <div>
            <MdLocationPin
              onClick={() => {
                window.location.href =
                  "https://www.google.com/maps/place/Sukras/@18.1086017,83.3988453,17z/data=!3m1!4b1!4m6!3m5!1s0x3a3be56c0f4509ab:0x96fbd530e1344a14!8m2!3d18.1086017!4d83.4014202!16s%2Fg%2F11ssyz4fjt?entry=ttu";
              }}
              style={{
                backgroundColor: "#d4af37",
                color: "000000",
                borderRadius: "50%",
                padding: "0.5%",
                fontSize: 20,
              }}
            />
          </div>
          <p style={{ fontSize: 13, marginLeft: 5, marginTop: 0 }}>
            2nd Floor, Seshadri Complex, Lower Tankbund Rd, opp. Mayura Hotel,
            near RTC complex, Gadi Khana, Balaji Nagar, Vizianagaram, Andhra
            Pradesh 535002
          </p>
        </div>
        <div className="location-footer">
          <div>
            <MdPhone
              style={{
                backgroundColor: "#d4af37",
                color: "000000",
                borderRadius: "50%",
                padding: "0.5%",
                fontSize: 20,
              }}
            />
          </div>

          <p style={{ fontSize: 13, marginLeft: 5, marginTop: 0 }}>
            + 9990 999 999
          </p>
        </div>
        <div className="location-footer">
          <MdEmail
            style={{
              backgroundColor: "#d4af37",
              color: "000000",
              borderRadius: "50%",
              padding: "0.5%",
              fontSize: 20,
            }}
          />
          <p style={{ fontSize: 13, marginLeft: 5, marginTop: 0 }}>
            sukras@gmail.com
          </p>
        </div>
        <div className="location-footer">
          <ImEarth
            onClick={() => {
              window.location.href = "https://www.sukrass.com/";
            }}
            style={{
              backgroundColor: "#d4af37",
              color: "000000",
              borderRadius: "50%",
              padding: "0.5%",
              fontSize: 20,
            }}
          />
          <p style={{ fontSize: 13, marginLeft: 5, marginTop: 0 }}>
            sukrass.com
          </p>
        </div>
      </div>
      <div className="logo-con3">
        <p>About Sukras</p>
        <p style={{ fontSize: 13, marginTop: 0 }}>
          Sukra's Salon Shop offers a luxurious escape into beauty and
          relaxation. With a blend of top-notch treatments, skilled stylists,
          and a serene ambiance, it's a haven for self-care. Discover a
          rejuvenating experience that leaves you feeling pampered and
          confident."
        </p>
        <p>Our Social Media</p>
        <div>
          <IoLogoFacebook style={{ fontSize: 25, marginLeft: 10 }} />
          <IoLogoYoutube style={{ fontSize: 25, marginLeft: 10 }} />
          <IoLogoInstagram style={{ fontSize: 25, marginLeft: 10 }} />
          <FaWhatsappSquare style={{ fontSize: 25, marginLeft: 10 }} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
