import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import About from "@/components/About/About";
import Work from "@/components/WorkArt/Work";
import Why from "@/components/Why/Why";
import Contact from "@/components/Contact/Contact";
export default function Home() {
  return (
    <div>
      <Header />
      <Main />
      <About />
      <Work />
      <Why />
      <Contact /> 
    </div>
  );
}
