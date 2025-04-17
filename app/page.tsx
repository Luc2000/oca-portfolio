import Hero from "./components/Hero";
import Services from "./components/Services";
import FeaturedProjects from "./components/FeaturedProjects";
import WhyChooseUs from "./components/WhyChooseUs";
import ContactCTA from "./components/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProjects />
      <WhyChooseUs />
      <ContactCTA />
    </>
  );
}
