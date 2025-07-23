import GLBShowcase from "@/components/GLBShowcase/GLBShowcase";
import Header from "@/components/Header/Header";
import { SmoothCursor } from "@/components/ui/Cursor/smooth-cursor";

export default function GLBShowcasePage() {
  return (
    <main data-scroll-container>
      <SmoothCursor />
      <Header />
      <GLBShowcase />
    </main>
  );
} 