import { Suspense } from "react";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { GitHubActivity, GitHubActivitySkeleton } from "@/components/sections/github-activity";
import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ProjectsSection />
      <Experience />
      <Suspense fallback={<GitHubActivitySkeleton />}>
        <GitHubActivity />
      </Suspense>
      <Contact />
    </>
  );
}
