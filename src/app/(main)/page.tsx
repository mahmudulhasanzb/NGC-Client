import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import Header from "@/components/home/Header";
import MomentsSection from "@/components/home/MomentsSection";
import NoticeSection from "@/components/home/NoticeSection";
import StatsSection from "@/components/home/StatsSection";

export default function Home() {
  return (
    <main>
      <Header />
      <NoticeSection />
      <AboutSection />
      <StatsSection />
      <MomentsSection />
      <ContactSection />
    </main>
  );
}
