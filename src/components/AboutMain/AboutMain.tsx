import Image from "next/image";
import Contact from "@/components/Contact/Contact";
import About from "@/components/About/About";

const AboutMain = () => {
  return (
    <>
        <div className="text-black mt-20">
          <About />
        </div>
      <Contact 
        backgroundColor="rgba(255,255,255,1)" 
        textColor="rgba(0,0,0,0.9)"
        theme="light"
      />
    </>
  );
};

export default AboutMain;
