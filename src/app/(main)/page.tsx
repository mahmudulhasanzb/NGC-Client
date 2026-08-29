import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import Header from "@/components/home/Header";
import MomentsSection from "@/components/home/MomentsSection";
import NoticeSection from "@/components/home/NoticeSection";
import StatsSection from "@/components/home/StatsSection";
import { serverFetch } from "@/lib/api/serverFetch";

export default async function Home() {
  const statsRes = await serverFetch({ path: "stats", revalidate: 60 });
  const stats = statsRes?.data || [];

  return (
    <main>
      <Header />
      <NoticeSection />
      <AboutSection />
      <StatsSection initialStats={stats} />
      <MomentsSection />
      <ContactSection />
    </main>
  );
}
