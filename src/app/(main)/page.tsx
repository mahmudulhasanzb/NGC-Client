import AboutSection from "@/components/home/AboutSection";
import Header from "@/components/home/Header";
import NoticeSection from "@/components/home/NoticeSection";

export default function Home() {
  return (
    <main>
      <Header />
      <NoticeSection />
      <AboutSection/>
    </main>
  );
}
