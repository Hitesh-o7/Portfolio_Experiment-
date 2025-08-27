import Header from "@/components/Header/Header";
import { SmoothCursor } from "@/components/ui/Cursor/smooth-cursor";
import { notFound } from "next/navigation";
import Image from "next/image";
import { gameProjects } from "@/data/gameProjects";
import { StarBorder } from "@/components/ui/star-border";
import { ExternalLink, Info } from "lucide-react"; 
import Contact from "@/components/Contact/Contact";

interface PageProps {
  params: Promise<{ gameId: string }>;
}

export default async function GameDetailPage({ params }: PageProps) {
  const { gameId } = await params;
  const project = gameProjects.find((p) => p.id === gameId);

  if (!project) notFound();

  return (
    <main data-scroll-container>
      <SmoothCursor />
      <Header />
      <section className="max-w-full      mx-auto px-[15%] py-20   ">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex flex-col gap-4 h-full justify-center items-center mb-10">
            <Image src="/Games/TopCrimson.PNG" alt="Stunt" width={1000} height={1000} />
          </div>
          <div className="flex justify-center items-center gap-6 mb-20">
            {project.playUrl && project.playUrl !== "#" && (
              <StarBorder
                as="a"
                href={project.playUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-105"
                color="rgba(34, 197, 94, 0.8)"
                speed="4s"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Play Now
              </StarBorder>
            )}
            <StarBorder
              as="a"
              href="#story"
              className="transition-all duration-300 hover:scale-105"
              color="rgba(59, 130, 246, 0.8)"
              speed="5s"
            >
              <Info className="w-5 h-5 mr-2" />
              Know More
            </StarBorder>
          </div>
          <div className="  flex flex-row gap-4  ">
            <div className="flex w-3/4  flex-col gap-4 ">
            <Image src="/Games/CrimsonName.PNG" alt="Stunt" width={400} height={1000} />
            <div id="story" className="flex flex-col gap-4 mb-10">
              <h1 className="text-3xl font-bold font-mono">Story</h1>
              <p className="text-lg">Once, two powerful clans ruled the land: the honorable Samurai Clan and the wise Sage Clan. At the beginning of your journey, you choose your path — Samurai or Sage — shaping your story. But peace was shattered by betrayal from within. The clans were wiped out, leaving only a single survivor — you. Now, driven by vengeance, you embark on a deadly mission to uncover the truth and destroy those responsible. Your oath is sealed in blood... Will you honor it? </p>
            </div>
            <div className="flex flex-col gap-4 mb-10">
            <h1 className="text-3xl font-bold font-mono">How to Play</h1>
            <div className="flex flex-col gap-4">   
              <ul className="list-disc pl-8">
                <li>Move Left — Press A</li>
                <li>Move Right — Press D</li>
                <li>Jump — Press Spacebar (you can perform multiple mid-air jumps)</li>
                <li>Attack — Left Click to strike enemies with your weapon</li>
              </ul>
              Master movement and aerial attacks to survive intense battles!
            </div>
            </div>
            <div className="flex flex-col gap-4 mb-10">
              <h1 className="text-3xl font-bold">
            Enemies You Will Face
            </h1>
            <div className="flex flex-col gap-4 ">
              <ul className="list-disc pl-8">
                <li>Green Slime — Deals 1 HP damage</li>
                <li>Orange Slime — Deals 2 HP damage</li>
                <li>Sword-based Enemies — Close-range melee attackers</li>
                <li>Wave Shooter Enemies — Launch deadly long-range attacks</li>
              </ul>
              Each enemy type challenges you differently — stay sharp!

            </div></div>
            <div>
              <h1 className="text-3xl font-bold">Your Goal</h1>
              <p>Fight through relentless enemies and survive brutal encounters. Your ultimate mission: Defeat the boss of the first level and continue your path of revenge. Only the strongest will stand victorious!</p>
            </div>
            
            
 
            </div>



 
            <div className="flex w-1/4 flex-col gap-4 ">
            <Image src="/Games/MainPage.PNG" alt="Stunt" width={1000} height={1000} />
            <Image src="/Games/Gameplay1.PNG" alt="Stunt" width={1000} height={1000} />
            <Image src="/Games/Gameplay2.PNG" alt="Stunt" width={1000} height={1000} />  
            <Image src="/Games/Gameplay3.PNG" alt="Stunt" width={1000} height={1000} />
            </div>

            
          </div>
        </div>
      </section>
      <Contact />
    </main>
  );
}

// Generate static params for all games
export async function generateStaticParams() {
  return gameProjects.map((p) => ({ gameId: p.id }));
}


