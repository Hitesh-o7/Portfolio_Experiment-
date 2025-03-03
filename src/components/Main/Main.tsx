"use client";

import Lanyard from "../Card/Lanyard";
import { ParallaxProvider } from "react-scroll-parallax";
import "./style.css"; // Import external CSS

const MainPage: React.FC = () => {
  return (
    <ParallaxProvider>
      <div className="main-container">
        {/* Lanyard positioned absolutely with overflow allowed */}
        <div className="lanyard-container hidden md:block">
          <div className="lanyard-wrapper">
            <Lanyard position={[0, 0, 14]} gravity={[0, -40, 0]} />
          </div>
        </div>

        {/* Content container */}
        <div className="content-container flex flex-col  items-center">
          <div className="text-container w-full text-center ">
            <h1 className="heading-main">Creative</h1>
            <h1 className="heading-sub flex flex-row justify-center gap-8">
              <span className="uiux-text text-ux  hidden md:block">UI UX</span>{" "}
              Developer
            </h1>
          </div>
        </div>
        <div className="small-screen-container block md:hidden">
          <img src="/aboutimg.jpg" alt="" />
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default MainPage;
