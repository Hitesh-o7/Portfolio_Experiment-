import Work from "@/components/Work/Work"; 
import Header from '../../components/Header/Header'; 
import { SmoothCursor } from "@/components/ui/Cursor/smooth-cursor";

export default function WorkPage() {
  return (
    <main data-scroll-container>
      <SmoothCursor />
      <Header />
      <Work />
    </main>
  );
}