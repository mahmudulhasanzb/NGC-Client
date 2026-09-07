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
  const [statsRes, noticesRes, galleryRes, aboutRes, coversRes] = await Promise.all([
    serverFetch({ path: "stats" }),
    serverFetch({ path: "notices" }),
    serverFetch({ path: "gallery?isFeatured=true" }),
    serverFetch({ path: "about" }),
    serverFetch({ path: "covers" }),
  ]);

  const stats = statsRes?.data || [];
  const notices = noticesRes?.data || [];
  const galleryItems = galleryRes?.data || [];
  const aboutData = aboutRes?.data || null;
  const covers = coversRes?.data || [];

  return (
    <main>
      <Header initialCovers={covers} />
      <NoticeSection notices={notices} />
      <AboutSection aboutData={aboutData} />
      <StatsSection initialStats={stats} />
      <MomentsSection initialItems={galleryItems} />
      <ContactSection />
    </main>
  );
}
