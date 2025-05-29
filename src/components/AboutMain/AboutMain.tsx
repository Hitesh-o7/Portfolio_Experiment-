import Image from "next/image";

const AboutMain = () => {
  return (
    <section className="w-full bg-white flex flex-col items-center px-4 py-16">
      {/* Heading */}
      <div className="w-full flex justify-center mt-[10%]">
        <h1 className="text-black font-AboutMe font-bold tracking-[-8px]  sm:tracking-[-10px] md:tracking-[-15px] text-[74px] sm:text-[80px] md:text-[120px] lg:text-[150px] leading-none text-center">
          ABOUT ME
        </h1>
      </div>

      {/* Description */}
      <div className="w-full max-w-6xl mt-[15%]  px-4">
        <h2 className="text-black text-[16px] sm:text-[24px] md:text-[30px] text-center leading-relaxed">
          years of extensive experience in web agencies, collaborating with
          both large-scale companies and innovative smaller ones. This has
          equipped me with the ability to effectively understand and meet
          companies&rsquo; preferences and needs.
        </h2>
      </div>

      {/* Image and Subtitle */}
      <div className="mt-[20%] px-4 flex flex-col justify-center items-center w-full max-w-6xl">
        <div className="flex justify-center flex-col md:flex-row items-center md:items-start  md:gap-[-14px]">
          <Image
            src="/MainPic.jpg"
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
        <div className="mt-8 md:mt-10 max-w-3xl mx-auto md:mx-0">
          <h2 className="text-black text-base sm:text-lg md:text-[24px] leading-relaxed">
            I am dedicated to accountability and excellence, always meeting
            deadlines and putting forth maximum effort. Driven by passion, I
            take on projects that captivate me, ensuring innovative and unique
            solutions. In collaboration, I prioritize respectful, harmonious
            relationships, fostering a positive and calm working environment.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default AboutMain;
