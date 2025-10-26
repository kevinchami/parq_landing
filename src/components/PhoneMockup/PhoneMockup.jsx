import React from "react";
import "./PhoneMockup.css";
import parqScreenshot from "../../assets/parq_screenshot.png";

const PhoneMockup = () => {
  return (
    <div className="phone-mockup">
      <img
        src={parqScreenshot}
        alt="Parq App Screenshot"
        className="transparent-screen"
      />
    </div>
  );
};

export default PhoneMockup;
