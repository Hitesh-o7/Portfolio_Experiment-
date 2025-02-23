"use client";

import { createContext, useContext, useState } from "react";

interface AnimationContextType {
  currentBg: string;
  currentTextColor: string;
  setCurrentBg: (color: string) => void;
  setCurrentTextColor: (color: string) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBg, setCurrentBg] = useState<string>("#ffffff");
  const [currentTextColor, setCurrentTextColor] = useState<string>("#000000");

  return (
    <AnimationContext.Provider value={{ currentBg, setCurrentBg, currentTextColor, setCurrentTextColor }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  if (!context) throw new Error("useAnimationContext must be used within an AnimationProvider");
  return context;
};
