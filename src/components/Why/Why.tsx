import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Why.css";

type SkillSet = {
  name: string;
  skills: Array<{
    id: string;
    title: string;
  }>;
};

// Sketchy Strike-through Component
const SketchyStrikethrough: React.FC<{ isVisible: boolean; textWidth: number }> = ({ isVisible, textWidth }) => {
  // Your custom SVG path
  const customPath = "M17.9455 54.8982C11.5329 46.8381 26.9211 27.3449 17.9455 20.127C12.5389 15.7793 4.46454 29.5015 4.46454 29.5015C-17.8839 72.1766 46.6658 87.9754 131.264 78.5928C290.3 60.9543 627.731 20.5024 930.156 23.6411C930.156 23.6411 233.596 77.3215 264.51 168.013C282.017 219.371 602.204 128.376 536.864 166.645C518.61 177.336 503.868 177.369 483.331 186.767C432.898 209.845 606.146 171.724 610.716 155.705C623.592 110.577 294.012 175.436 286.588 165.864C251.419 109.173 979 46.3037 979 29.5013C979 -64.0825 52.9178 98.8551 17.9455 54.8982Z";
   
  const originalWidth = 979; // Original SVG width
  const scaleFactor = Math.max(0.5, (textWidth + 100) / originalWidth); // Add more padding, increased minimum scale

  return (
    <svg
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${scaleFactor})`,
        width: `${979 * scaleFactor}px`,
        height: `${194 * scaleFactor}px`,
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 10
      }}
      viewBox="0 0 979 194"
      fill="none"
    >
      <defs>
        {/* Create a mask using the same path but as a stroke that animates */}
        <mask id="path-mask">
          <rect width="979" height="194" fill="black" />
          <motion.path
            d={customPath}
            fill="none"
            stroke="white"
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              pathLength: { duration: 1.5, ease: "easeInOut" }
            }}
          />
        </mask>
      </defs>
      
      {/* The filled path that gets revealed along the curve */}
      <motion.path
        d={customPath}
        fill="red"
        mask="url(#path-mask)"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          opacity: { duration: 0.3, ease: "easeInOut" }
        }}
      />
      
      {/* Gradient definition from your original SVG */}
      <defs>
        <linearGradient id="a" x1="1" y1="4.333" x2="62.687" y2="4.333" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor"/>
          <stop offset="1" stopColor="currentColor" stopOpacity="0.5"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

// Typewriter Text Component with Sketchy Strike-through
const TypewriterText: React.FC<{ text: string; delay?: number; resetKey?: string }> = ({ text, delay = 0, resetKey }) => {
  const [showStrikethrough, setShowStrikethrough] = React.useState(false);
  const [textWidth, setTextWidth] = React.useState(0);
  const textRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
    }
  }, [text]);

  React.useEffect(() => {
    // Reset strike-through when resetKey changes
    setShowStrikethrough(false);
    
    // Show strike-through after text is fully typed
    const strikethroughTimer = setTimeout(() => {
      setShowStrikethrough(true);
    }, delay + text.length * 50 + 500); // After typewriter + 500ms delay

    return () => clearTimeout(strikethroughTimer);
  }, [text, delay, resetKey]);

  return (
    <div style={{ position: 'relative', display: 'inline-block', zIndex: 1 }}>
      <motion.p
        ref={textRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
        style={{ position: 'relative', zIndex: 5 }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: delay + index * 0.05,
              duration: 0.1
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
      <SketchyStrikethrough isVisible={showStrikethrough} textWidth={textWidth} />
    </div>
  );
};

const Why: React.FC = () => {
  const skillSets: SkillSet[] = [
    {
      name: "My Skillset",
      skills: [
        { id: "01", title: "UI DESIGN" },
        { id: "02", title: "FRONTEND DEVELOPMENT" },
        { id: "03", title: "UX DESIGN" },
        { id: "04", title: "NO-CODE DEVELOPMENT" }
      ]
    },
    {
      name: "Game Dev",
      skills: [
        { id: "01", title: "UNITY 3D" },
        { id: "02", title: "C# SCRIPTING" },
        { id: "03", title: "GAME ENGINE" },
        { id: "04", title: "LEVEL DESIGN" }
      ]
    },
    {
      name: "3D Art",
      skills: [
        { id: "01", title: "BLENDER" },
        { id: "02", title: "3D MODELING" },
        { id: "03", title: "TEXTURING" },
        { id: "04", title: "ANIMATION" }
      ]
    },
    {
      name: "2D Art",
      skills: [
        { id: "01", title: "PHOTOSHOP" },
        { id: "02", title: "ILLUSTRATOR" },
        { id: "03", title: "CONCEPT ART" },
        { id: "04", title: "DIGITAL PAINTING" }
      ]
    },
    {
      name: "Game Design",
      skills: [
        { id: "01", title: "MECHANICS" },
        { id: "02", title: "NARRATIVE" },
        { id: "03", title: "BALANCING" },
        { id: "04", title: "USER EXPERIENCE" }
      ]
    }
  ];

  const [activeSkillSet, setActiveSkillSet] = useState<number>(0);

  return (
    <div className="why-container">
      <div className="left-section">
        <div className="sticky-container">
          {skillSets.map((skillSet, index) => (
            <div
              key={index}
              className={`sticky-text ${activeSkillSet === index ? 'active' : 'inactive'}`}
              onClick={() => setActiveSkillSet(index)}
            >
              {activeSkillSet === index ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  {skillSet.name}
                  <SketchyStrikethrough 
                    isVisible={true} 
                    textWidth={skillSet.name.length * 30}  
                  />
                </div>
              ) : (
                skillSet.name
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="right-section">
        <div className="grid grid-cols-2  ">
          {Array.from({ length: 8 }, (_, index) => {
            const skill = skillSets[activeSkillSet].skills.find((_, skillIndex) => {
              // Map skills to specific positions in the grid
              const positions = [0, 3, 4, 7]; // positions where we want to show skills
              return positions[skillIndex] === index;
            });

            if (skill) {
              const skillIndex = skillSets[activeSkillSet].skills.findIndex(s => s.id === skill.id);
              return (
                <div 
                  key={`${activeSkillSet}-${index}`} 
                  className="box border border-[#191919] text-2xl p-4 flex flex-col justify-between items-start"
                >
                  <h1 className="text-xl">
                    {skill.id}
                  </h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: skillIndex * 0.2 }}
                  >
                    {skill.title.split("").map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          delay: skillIndex * 0.2 + charIndex * 0.05,
                          duration: 0.1
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.p>
                </div>
              );
            } else {
              return <div key={`${activeSkillSet}-${index}`} className="box p-2 flex items-end"></div>;
            }
          })}
        </div>
        <div className="responsive-svg">
          <img src="/Work.svg" alt="Work SVG" style={{ width: "100%", height: "auto", display: "block", margin: "0 auto" }} />
        </div>
      </div>
    </div>
  );
};
 
export default Why;
