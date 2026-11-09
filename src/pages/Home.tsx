import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { Solutions } from "@/sections/Solutions";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { NebulaBackground } from "@/components/NebulaBackground";

export default function Home() {
  return (
    <div className="min-h-[100dvh]">
      {/* Fixed grey-smoke backdrop; the dark hero paints over it */}
      <NebulaBackground />
      <Navbar />
      <div className="relative z-10">
        <main>
          <Hero />
          <Services />
          <Solutions />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
