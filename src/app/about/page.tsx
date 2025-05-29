import AboutMain from '@/components/AboutMain/AboutMain'
import Header from '../../components/Header/Header';
import { SmoothCursor } from "@/components/ui/Cursor/smooth-cursor";

export default function About() {
  return (
    <main data-scroll-container className="min-h-screen">
      <SmoothCursor /> 
      <Header />
      <AboutMain />
    </main>
  )
}
