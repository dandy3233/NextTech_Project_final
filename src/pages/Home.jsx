import AboutUs from "../ui/Home Page/AboutUs";
import Clients from "../ui/Home Page/ClientGrid";
import CounterComponent from "../ui/Home Page/CounterComponent";
import MainCoponents from "../ui/Home Page/MainCoponents";
import RecentProjects from "../ui/Home Page/RecentProjects";
import TeamSection from "../ui/Home Page/TeamSection";
import WhatWeOffer from "../ui/Home Page/WhatWeOffer";
import Testimonials from "../ui/Home Page/Testimonials";
import FooterCard from "../ui/Home Page/FooterCard";

function Home() {
  return (
    <>
      <div>
        <MainCoponents />
        <CounterComponent />
        <AboutUs />
        <WhatWeOffer />
        <Clients />
        <RecentProjects />
        <TeamSection />
        <Testimonials />
        <FooterCard />
      </div>
    </>
  );
}

export default Home;

