import React from "react";
import "./Why.css";

// Define the type for content items
interface ContentItem {
  number: number;
  title: string;
  text: string;
}

const Why: React.FC = () => {
  const content: ContentItem[] = [
    {
      number: 1,
      title: "Efficiency",
      text: "I focus on delivering high-quality designs and solutions in a short timeframe without compromising on quality.",
    },
    {
      number: 2,
      title: "Creativity",
      text: "My designs are innovative and unique, combining aesthetics with functionality to stand out in any project.",
    },
    {
      number: 3,
      title: "Technical Skills",
      text: "I bring a versatile skill set, including expertise in Next.js, Framer Motion, GSAP, Figma, Canva, and programming languages like Python, C, C++, and Java.",
    },
  ];

  return (
    <div className="why-container">
      <div className="left-section">
        <div className="sticky-container">
          <div className="sticky-text ">Why Work With Me</div>
        </div>
      </div>

      <div className="right-section">
        {/* {content.map((item) => (
          <div className="content-block" key={item.number}>
            <div className="number">{item.number}.</div>
            <div className="text">
              <h3>{item.title}</h3>
              <hr />
              <p>{item.text}</p>
            </div>
          </div>
        ))} */}
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
