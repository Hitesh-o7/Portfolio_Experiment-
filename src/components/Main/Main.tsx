"use client";

import Lanyard from "../Card/Lanyard";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import Image from "next/image";
import styles from "./style.module.css";

const MainPage: React.FC = () => {
  return (
    <ParallaxProvider>
      <div className="min-h-screen relative">
        {/* Lanyard positioned absolutely with overflow allowed */}
        <div className="absolute top-0 right-0 w-[80%] h-screen z-10 pointer-events-none overflow-visible">
          <div className="relative w-full h-full">
            <Lanyard position={[0, 0, 14]} gravity={[0, -40, 0]} />
          </div>
        </div>

        {/* Content container */}
        <div className="relative z-0 p-10">
          {/* UI/UX Div */}
          <div className="mt-[150px]">
            <h1 className="text-[180px] font-bold leading-[160px]">
              Creative <br /> UI UX
            </h1>
            <h1 className="text-[180px] mt-[-100px] font-bold  font-bold text-transparent [-webkit-text-stroke:4px_white] ">
              Developer
            </h1>
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default MainPage;
