import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import Header from "@/components/home/Header";
import MomentsSection from "@/components/home/MomentsSection";
import NoticeSection from "@/components/home/NoticeSection";
import StatsSection from "@/components/home/StatsSection";
import { serverFetch } from "@/lib/api/serverFetch";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const [statsRes, noticesRes] = await Promise.all([
    serverFetch({ path: "stats" }),
    serverFetch({ path: "notices" }),
  ]);

  const stats = statsRes?.data || [];
  const notices = noticesRes?.data || [];

  return (
    <main>
      <Header />
      <NoticeSection notices={notices} />
      <AboutSection />
      <StatsSection initialStats={stats} />
      <MomentsSection />
      <ContactSection />
    </main>
  );
}
