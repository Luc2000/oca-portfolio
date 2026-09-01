import Hero from "./components/Hero";
import DevsSection from "./components/DevsSection";
import Services from "./components/Services";
import FeaturedProjects from "./components/FeaturedProjects";
import WhyChooseUs from "./components/WhyChooseUs";
import ContactCTA from "./components/ContactCTA";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <DevsSection source="home" />
      <Services />
      <FeaturedProjects />
      <WhyChooseUs />
      <ContactCTA />
    </>
  );
}
