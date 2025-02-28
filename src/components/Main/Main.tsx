"use client";

import Lanyard from "../Card/Lanyard";
import { ParallaxProvider } from "react-scroll-parallax";  
import "./style.css"; // Import external CSS

const MainPage: React.FC = () => {
  return (
    <ParallaxProvider>
      <div className="main-container">
        {/* Lanyard positioned absolutely with overflow allowed */}
        <div className="lanyard-container">
          <div className="lanyard-wrapper">
            <Lanyard position={[0, 0, 14]} gravity={[0, -40, 0]} />
          </div>
        </div>

        {/* Content container */}
        <div className="content-container">
          {/* UI/UX Div */}
          <div className="text-container">
            <h1 className="heading-main">Creative</h1> 
            <h1 className="heading-sub">
              <span className="uiux-text text-ux">UI UX</span> Developer
            </h1>
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default MainPage;
