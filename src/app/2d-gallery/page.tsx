import ArtShowcase from "@/components/ArtShowcase/ArtShowcase";
import Header from "@/components/Header/Header";
import { SmoothCursor } from "@/components/ui/Cursor/smooth-cursor";

export default function ArtGalleryPage() {
  return (
    <main data-scroll-container>
      <SmoothCursor />
      <Header />
      <ArtShowcase />
    </main>
  );
} 