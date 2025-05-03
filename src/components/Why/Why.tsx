import React from "react";
import "./Why.css";
 
 

const Why: React.FC = () => {
  
  return (
    <div className="why-container">
      <div className="left-section">
        <div className="sticky-container">
          <div className="sticky-text ">Why Work With Me</div>
        </div>
      </div>

      <div className="right-section">
      
        <div className="grid grid-cols-2 mt-200">
          <div className="border border-white/30    text-2xl h-[350px] p-4 flex items-end  ">
            UI DESIGN
          </div>
          <div className="p-4 h-[350px] flex items-end  "> </div>
          <div className="p-4 h-[350px] flex items-end  "> </div>
          <div className="border border-white/30 h-[350px] text-2xl border-white/50 p-4 flex items-end  ">
            Brand Design
          </div>
          <div className="border border-white/30 h-[350px] text-2xl border-white/50 p-4 flex items-end  ">
            UX Design
          </div>
          <div className="p-4 h-[350px] flex items-end justify-center"> </div>
          <div className="p-4 h-[350px] flex items-end justify-center"> </div>
          <div className="border border-white/30 h-[350px]  text-2xl border-white/50 p-4 flex items-end  ">
            No-code development
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
