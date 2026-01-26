import ScrollIntro from "../../components/ScrollIntro";
import PinnedDoorHero from "../../components/PinnedDoorHero";
import FeaturedWork from "../../components/FeaturedWork";
import SignatureMoves from "../../components/SignatureMoves";
import ProofResultsStrip from "../../components/ProofResultsStrip";
import ProcessTimeline from "../../components/ProcessTimeline";
import TechStackPerformance from "../../components/TechStackPerformance";
import About from "../../components/About";
import ContactCTA from "../../components/ContactCTA";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Home() {
  return (
	<div className="font-sans min-h-screen">
	  <Header />
	  <PinnedDoorHero />

	  <main className="container-max py-12">
		<ScrollIntro />
		<FeaturedWork />
		<SignatureMoves />
		<ProofResultsStrip />
		<ProcessTimeline />
		<TechStackPerformance />
		<About />
		<ContactCTA />
	  </main>

	  <Footer />
	</div>
  );
}
