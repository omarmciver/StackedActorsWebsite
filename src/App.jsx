import './App.css';
import React from 'react'
import Spinner from './components/support/Spinner';
import Navbar from './components/nav/Navbar';
import HeaderSection from './components/sections/HeaderSection/HeaderSection';
import IntroSection from './components/sections/IntroSection/IntroSection';
import AccordionSection from './components/sections/AccordionSection/AccordionSection';
import TabsSection from './components/sections/TabsSection/TabsSection';
import ProjectsSection from './components/sections/ProjectsSection/ProjectsSection';
import FooterSection from './components/sections/FooterSection/FooterSection';
import CopyrightSection from './components/sections/CopyrightSection/CopyrightSection';

function App() {
  return (
    <div className="App">
      <Spinner />
      <Navbar />
      <HeaderSection />
      <ProjectsSection />
      {/* <IntroSection /> */}
      {/* <AccordionSection /> */}
      {/* <TabsSection /> */}
      {/* <FooterSection /> */}
      <CopyrightSection />
    </div>
  );
}

export default App;
