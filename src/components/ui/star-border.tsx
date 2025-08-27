import { cn } from "@/lib/utils"
import React from "react"

interface StarBorderProps {
  as?: React.ElementType
  color?: string
  speed?: string
  className?: string
  children: React.ReactNode
  [key: string]: any // Allow any additional props
}

export function StarBorder({
  as,
  className,
  color,
  speed = "6s",
  children,
  ...props
}: StarBorderProps) {
  const Component = (as || "button") as any
  const defaultColor = color || "#3b82f6"

  return (
    <Component 
      className={cn(
        "relative inline-block overflow-hidden rounded-[20px] cursor-pointer",
        className
      )} 
      {...props}
    >
      <div
        className="absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom opacity-60"
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 20%)`,
          animationDuration: speed,
          zIndex: 1,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top opacity-60"
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 20%)`,
          animationDuration: speed,
          zIndex: 1,
        }}
      />
      <div className={cn(
        "relative border text-center text-sm py-3 px-4 rounded-[20px] bg-white/90 border-gray-200/50",
        "hover:bg-white hover:border-gray-300 transition-all duration-300",
        "backdrop-blur-sm shadow-sm text-gray-800 font-medium flex items-center justify-center"
      )}
      style={{ zIndex: 10 }}
      >
        {children}
      </div>
    </Component>
  )
}
