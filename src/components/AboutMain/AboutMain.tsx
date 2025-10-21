import Image from "next/image";
import Contact from "@/components/Contact/Contact";

const AboutMain = () => {
  return (
    <>
    <section className="w-full bg-white flex flex-col items-center px-4 py-16 mb-20"> 
      <div className="w-full flex justify-center mt-[40%] sm:mt-[20%]">
        <h1 className="text-black font-AboutMe font-extrabold tracking-[-8px]  sm:tracking-[-10px] md:tracking-[-24px] text-[74px] sm:text-[80px] md:text-[120px] lg:text-[200px] leading-none text-center">
          ABOUT ME
        </h1>
      </div>

      {/* Description */}
      <div className="w-full max-w-6xl mt-[15%]  px-4">
        <h2 className="text-black text-[16px] sm:text-[24px] md:text-[30px] text-center leading-relaxed">
        I’m Hitesh, a Game Developer & Frontend Engineer passionate about creating interactive and immersive experiences. I build 2D/3D games in Unity and design modern web apps with Next.js and TypeScript, blending creativity with technical precision. My focus is on delivering engaging gameplay, clean UI/UX, and seamless digital experiences.
       </h2>
      </div>

      {/* Image and Subtitle */}
      <div className="mt-[20%] px-4 flex flex-col justify-center items-center w-full max-w-6xl">
        <div className="flex justify-center flex-col md:flex-row items-center md:items-start  md:gap-[-14px]">
          <Image
            src="/MainPic.avif"
            alt="Profile"
            width={256}
            height={256}
            className="rounded-full w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[256px] md:h-[256px] object-cover"
          />
          <h1 className="text-black font-AboutMe font-extrabold text-[32px] sm:text-[44px] md:text-[90px] leading-tight tracking-tight text-center md:text-left">
            PRINCIPLES <span className="block mt-[-10px]">&amp; GUIDELINES</span>
          </h1>
        </div>

        {/* Paragraph */}
        <div className="mt-8 md:mt-10 max-w-4xl mx-auto md:mx-0">
          <h2 className="text-black text-base sm:text-lg md:text-[24px] justify-center items-center flex flex-col gap-4 leading-relaxed">
          <ul className="flex flex-col gap-4 ">
            <li><b>Accountable & Reliable</b> — Committed to deadlines and quality.</li>
            <li><b>Innovative & Curious</b> — Driven to explore new ideas and technologies.</li>
            <li><b>Collaborative & Respectful</b> — Building positive, team-oriented environments.</li>
            <li><b>Focused on Excellence</b> — Delivering polished, impactful results in every project.</li>
          </ul>
          </h2>
        </div>
      </div>
    </section>
    <Contact 
      backgroundColor="rgba(255,255,255,1)" 
      textColor="rgba(0,0,0,0.9)"
      theme="light"
    />
    </>
  );
};

export default AboutMain;
