import React from "react";
import "./Why.css";

const Why: React.FC = () => {
  return (
    <div className="why-container">
      <div className="left-section">
        <div className="sticky-container">
          <div className="sticky-text">My Skillset</div>
        </div>
      </div>

      <div className="right-section">
        <div className="grid grid-cols-2  ">
          <div className="box border border-[#191919] text-2xl p-4 flex flex-col justify-between items-start">
            <h1 className="text-xl">01</h1>
            <p>UI DESIGN</p>
          </div>
          <div className="box  p-2 flex items-end"></div>
          <div className="box p-2 flex items-end"></div>
          <div className="box border border-[#191919] text-2xl p-4 flex flex-col justify-between items-start">
            <h1 className="text-xl">02</h1>
            <p>FRONTEND DEVELOPMENT</p>
          </div>
          <div className="box border border-[#191919] text-2xl p-4 flex flex-col justify-between items-start">
            <h1 className="text-xl">03</h1>
            <p>UX DESIGN</p>
          </div>
          <div className="box p-2 flex items-end justify-center"></div>
          <div className="box p-2 flex items-end justify-center"></div>
          <div className="box border border-[#191919] text-2xl p-4 flex flex-col justify-between items-start">
            <h1 className="text-xl">04</h1>
            <p>NO-CODE DEVELOPMENT</p>
          </div>
        </div>
        <div className="responsive-svg">
          <img src="/work.svg" alt="Work SVG" style={{ width: "100%", height: "auto", display: "block", margin: "0 auto" }} />
        </div>
      </div>
    </div>
  );
};
 
export default Why;
