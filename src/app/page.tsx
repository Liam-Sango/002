"use client";

import { useEffect, useState } from "react";
import { type SectionId } from "@/components/NavBar";
import { SOCIALS } from "@/lib/site";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";

const SECTIONS: SectionId[] = [
  "about",
  "skills",
  "experience",
  "projects",
  "blog",
  "contact",
];

function sectionFromHash(): SectionId | null {
  const hash = window.location.hash.replace(/^#/, "");
  return SECTIONS.includes(hash as SectionId) ? (hash as SectionId) : null;
}

export default function Home() {
  // `null` → show the hero; otherwise show the matching section panel.
  // Driven by the URL hash so it stays in sync with NavBar links and
  // deep-links such as /#blog (e.g. the "Back" link from a detail page).
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const sync = () => setActive(sectionFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <main>
      <div className="site-container">
        {/* Keyed so the enter animation retriggers on every tab switch */}
        <div key={active ?? "home"} className="panel-enter">
          {active === null && <HeroSection />}
          {active === "about" && <AboutSection />}
          {active === "skills" && <SkillsSection />}
          {active === "experience" && <ExperienceSection />}
          {active === "projects" && <ProjectsSection />}
          {active === "blog" && <BlogSection />}
          {active === "contact" && <ContactSection socials={SOCIALS} />}
        </div>
      </div>
    </main>
  );
}
