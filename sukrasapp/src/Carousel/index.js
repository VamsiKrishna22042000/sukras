import { useState, useEffect } from "react";

import "./index.css";

const carouselImg = [
  {
    id: 0,
    imgUrl: "beautyzone1",
    offer: "Up to 20% off",
    service: "On Facial & Spa",
    btn: "Book Now   ❯",
  },
  {
    id: 1,
    imgUrl: "beautyzone2",
    offer: "Min to 15% off",
    service: "On Makeup & HairStyles",
    btn: "Book Now   ❯",
  },
  {
    id: 2,
    imgUrl: "beautyzone3",
    offer: "Min to 50% off",
    service: "On Manicure & Padicure",
    btn: "Book Now   ❯",
  },
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      if (activeIndex === carouselImg.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [activeIndex]);

  return (
    <>
      <div className="carouselImg-con">
        {carouselImg.map((each) => (
          <div
            key={each.id}
            id={each.id}
            className="beautyzone-carousel-content"
            style={{
              transform: `translate(-${activeIndex * 100}%)`,
              backgroundImage: `URL(./${each.imgUrl}.png)`,
            }}
          >
            <h1 className="offer">{each.offer}</h1>
            <p className="service">{each.service}</p>
            <button className="btn" type="button">
              {each.btn}
            </button>
            <div className="shadow"></div>
          </div>
        ))}
      </div>
      <div className="dots-con">
        {carouselImg.map((each) => (
          <div
            key={each.id}
            id={each.id}
            className={activeIndex === each.id ? "dots" : "dots2"}
          ></div>
        ))}
      </div>
    </>
  );
};

export default Carousel;
