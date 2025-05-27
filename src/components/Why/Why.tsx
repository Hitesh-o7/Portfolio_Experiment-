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
        <div className="grid grid-cols-2 mt-200">
          <div className="border border-[#191919] text-2xl h-[350px] p-4 flex items-end">
            <p>UI DESIGN</p>
          </div>
          <div className="p-4 h-[350px] flex items-end"></div>
          <div className="p-4 h-[350px] flex items-end"></div>
          <div className="border border-[#191919] h-[350px] text-2xl border-white/50 p-4 flex items-end"><p>BRAND DESIGN</p></div>
          <div className="border border-[#191919] h-[350px] text-2xl border-white/50 p-4 flex items-end"><p>UX DESIGN</p></div>
          <div className="p-4 h-[350px] flex items-end justify-center"></div>
          <div className="p-4 h-[350px] flex items-end justify-center"></div>
          <div className="border border-[#191919] h-[350px] text-2xl border-white/50 p-4 flex items-end">
            <p>NO-CODE DEVELOPMENT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
