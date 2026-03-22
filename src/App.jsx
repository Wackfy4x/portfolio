import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import { SectionDivider } from './components/ui/index.jsx';

import Hero                from './components/sections/Hero.jsx';
import About               from './components/sections/About.jsx';
import Skills              from './components/sections/Skills.jsx';
import Projects            from './components/sections/Projects.jsx';
import { Experience, Formations, Hackathons } from './components/sections/Timeline.jsx';
import Certifications      from './components/sections/Certifications.jsx';
import SoftSkillsLanguages from './components/sections/SoftSkillsLanguages.jsx';
import Contact             from './components/sections/Contact.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Hackathons />
        <SectionDivider />
        <Formations />
        <SectionDivider />
        <Certifications />
        <SectionDivider />
        <SoftSkillsLanguages />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
