'use client';
import Header from '../../components/Header/Header';
import ContactMain from '../../components/ContactMain/ContactMain';
import { SmoothCursor } from "@/components/ui/Cursor/smooth-cursor";

export default function ContactPage() {

  return (
    <main data-scroll-container> 
      <SmoothCursor />
      <Header />
      <ContactMain/>
    </main>
  );
}
