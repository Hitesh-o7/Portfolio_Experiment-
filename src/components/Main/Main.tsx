"use client";

import Lanyard from "../Card/Lanyard";
import { ParallaxProvider } from "react-scroll-parallax";
import "./style.css";

const MainPage: React.FC = () => {
  return (
    <ParallaxProvider>
      <div className="main-container">
        <div className="lanyard-container hidden md:block">
          {/* <div className="lanyard-wrapper   mt-[-70px]">
            <Lanyard position={[0, 0, 18]} gravity={[0, -40, 0]} />
          </div> */}
        </div>
        <div className="content-container flex flex-col  items-center">
          <div className="flex items-center justify-center w-full h-[100vh]">
            <h1 className="text-[150px] font-reddit font-semibold mb-8">
              Creative Designer Developer
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
