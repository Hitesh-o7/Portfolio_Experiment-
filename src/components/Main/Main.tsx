"use client";

import Lanyard from "../Card/Lanyard";
import { ParallaxProvider } from "react-scroll-parallax"; 
import TextPressure from "../ui/TextPressure/TextPressure";

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
          <div className="mt-[150px] ml-[5%] flex flex-col gap-16">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[170px] font-super font-bold">
              Creative  
            </h1> 
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[170px] font-super font-bold">
              <span className="font-light text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-[50px]">UI UX</span> Developer
            </h1>
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default MainPage;
