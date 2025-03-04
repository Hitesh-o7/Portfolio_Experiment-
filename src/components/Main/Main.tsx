"use client";

import Lanyard from "../Card/Lanyard";
import { ParallaxProvider } from "react-scroll-parallax";
import "./style.css"; // Import external CSS

const MainPage: React.FC = () => {
  return (
    <ParallaxProvider>
      <div className="main-container"> 
        <div className="lanyard-container hidden md:block">
          <div className="lanyard-wrapper">
            <Lanyard position={[0, 0, 16]} gravity={[0, -40, 0]} />
          </div>
        </div>
        <div className="content-container flex flex-col  items-center">
          <div className="text-container flex  flex-col w-full h-screen justify-center lg:px-16 md:px-8 sm:px-2 ">
            <h1 className="heading-main">Creative</h1>
            <h1 className="heading-sub flex flex-row justify-center gap-8">
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
