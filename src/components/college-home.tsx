"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Clock3,
  GraduationCap,
  Library,
  MapPin,
  Menu,
  Quote,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const notices = [
  { date: "25 Aug 2026", title: "HSC 1st Year admission notice — session 2026–27", type: "Admission" },
  { date: "18 Aug 2026", title: "National Mourning Day program schedule", type: "Events" },
  { date: "12 Aug 2026", title: "Form fill-up notice for Degree Pass students", type: "Academic" },
];

const gallery = [
  { src: "/campus-hero.png", alt: "Students walking across the college campus", label: "Our campus" },
  { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85", alt: "Students studying together", label: "Student life" },
  { src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=85", alt: "University library interior", label: "Learning spaces" },
];

function BrandMark() {
  return <div className="brand-mark" aria-hidden="true"><span>NGC</span><i /></div>;
}

export function CollegeHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main>
      <div className="topbar"><div className="shell topbar-inner"><span>Established 1949</span><span className="topbar-note">Education · Integrity · Service</span><a href="#contact">Help desk <ArrowUpRight size={13} /></a></div></div>
      <header className="site-header"><div className="shell header-inner">
        <a href="#top" className="brand"><BrandMark /><span><strong>Narsingdi Government College</strong><small>নরসিংদী সরকারি কলেজ</small></span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Main navigation"><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#academics" onClick={() => setMenuOpen(false)}>Academics</a><a href="#notices" onClick={() => setMenuOpen(false)}>Notices</a><a href="#gallery" onClick={() => setMenuOpen(false)}>Campus life</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a><a className="nav-apply" href="#admissions" onClick={() => setMenuOpen(false)}>Apply now <ArrowUpRight size={16} /></a></nav>
      </div></header>

      <section className="hero" id="top"><div className="shell hero-grid"><div className="hero-copy"><p className="eyebrow"><span /> A tradition of learning since 1949</p><h1>Where curious minds <em>find their way.</em></h1><p className="hero-text">A public college rooted in the community, opening doors to knowledge, character, and a future worth building.</p><div className="hero-actions"><a className="button button-dark" href="#admissions">Explore admissions <ArrowUpRight size={17} /></a><a className="text-link" href="#about">Discover our story <ChevronRight size={17} /></a></div><div className="hero-meta"><div><strong>12,000+</strong><span>Alumni community</span></div><div><strong>78 years</strong><span>Of public service</span></div></div></div><div className="hero-visual"><Image src="/campus-hero.png" alt="Students walking across the Narsingdi Government College campus" fill priority sizes="(max-width: 768px) 100vw, 52vw" /><div className="image-caption"><span>01 / 03</span><span>Morning on campus <ArrowUpRight size={14} /></span></div></div></div></section>

      <section className="notice-strip" id="notices"><div className="shell notice-inner"><div className="notice-label"><span className="notice-dot" /> Latest notices</div><div className="notice-items">{notices.map((notice) => <a href="#notices" key={notice.title}><span>{notice.date}</span><strong>{notice.title}</strong><ArrowUpRight size={15} /></a>)}</div><a className="all-link" href="#notices">View all <ArrowUpRight size={15} /></a></div></section>

      <section className="section about-section" id="about"><div className="shell two-col"><div><p className="eyebrow">01 — The college</p><h2>An education that stays with you.</h2></div><div className="about-copy"><p className="lead">Narsingdi Government College is more than classrooms and examinations. It is a place where generations of students have grown into thoughtful citizens, capable professionals, and active members of their communities.</p><p>With a vibrant academic culture and a campus that feels like home, we bring together dedicated teachers, ambitious learners, and the freedom to ask better questions.</p><a className="text-link" href="#contact">Learn more about NGC <ChevronRight size={17} /></a></div></div><div className="shell stat-grid"><div><GraduationCap /><strong>26+</strong><span>Academic departments</span></div><div><Users /><strong>4,800</strong><span>Current students</span></div><div><Library /><strong>45,000+</strong><span>Library resources</span></div><div><BookOpen /><strong>98%</strong><span>Pass rate, 2025</span></div></div></section>

      <section className="section academics-section" id="academics"><div className="shell"><div className="section-head"><div><p className="eyebrow">02 — Learning at NGC</p><h2>Room to grow<br /><em>in every direction.</em></h2></div><p>Choose a path that meets you where you are and takes you where you want to go.</p></div><div className="academic-grid"><a href="#admissions" className="academic-card featured"><span className="card-number">01</span><GraduationCap /><h3>Higher Secondary</h3><p>Humanities, Science, and Business Studies for the next step in your journey.</p><span className="card-link">View programs <ArrowUpRight size={16} /></span></a><a href="#admissions" className="academic-card"><span className="card-number">02</span><BookOpen /><h3>Degree Pass</h3><p>Build a strong foundation with flexible, community-focused undergraduate study.</p><span className="card-link">View programs <ArrowUpRight size={16} /></span></a><a href="#admissions" className="academic-card"><span className="card-number">03</span><Library /><h3>Honours</h3><p>Go deeper into your subject with focused, four-year honours programs.</p><span className="card-link">View programs <ArrowUpRight size={16} /></span></a></div></div></section>

      <section className="quote-section"><div className="shell quote-inner"><Quote size={42} /><blockquote>“The best thing about NGC is that it teaches you to take your place in the world — with confidence and with care.”</blockquote><div className="quote-author"><div className="author-avatar">FS</div><span><strong>Farhana Sultana</strong><small>Former student, Department of Economics</small></span></div></div></section>

      <section className="section gallery-section" id="gallery"><div className="shell"><div className="section-head"><div><p className="eyebrow">03 — Life on campus</p><h2>A campus with<br /><em>its own rhythm.</em></h2></div><a className="text-link" href="#gallery">See campus life <ArrowUpRight size={17} /></a></div><div className="gallery-grid">{gallery.map((item, index) => <a className={index === 0 ? "gallery-item gallery-main" : "gallery-item"} href="#gallery" key={item.label}><Image src={item.src} alt={item.alt} fill sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"} /><span>{item.label} <ArrowUpRight size={15} /></span></a>)}</div></div></section>

      <section className="admission-section" id="admissions"><div className="shell admission-inner"><div><p className="eyebrow light">Admissions 2026–27</p><h2>Your next chapter<br /><em>starts here.</em></h2></div><div><p>Applications for HSC, Degree Pass, and Honours programs are now open. Find your program and take the first step.</p><a className="button button-light" href="#contact">See admission details <ArrowUpRight size={17} /></a></div></div></section>

      <footer className="site-footer" id="contact"><div className="shell footer-grid"><div className="footer-brand"><a href="#top" className="brand"><BrandMark /><span><strong>Narsingdi Government College</strong><small>নরসিংদী সরকারি কলেজ</small></span></a><p>Knowledge, character, and a future worth building.</p><div className="socials"><a href="#contact" aria-label="Facebook">fb</a><a href="#contact" aria-label="Instagram">ig</a><a href="#contact" aria-label="YouTube">yt</a></div></div><div><p className="footer-label">Visit</p><p>College Road, Narsingdi<br />Dhaka Division, Bangladesh</p><a className="footer-contact" href="#contact"><MapPin size={15} /> Get directions</a></div><div><p className="footer-label">Contact</p><p><a href="tel:+880946255000">+880 9462-55000</a><br /><a href="mailto:info@ngc.edu.bd">info@ngc.edu.bd</a></p><p className="footer-contact"><Clock3 size={15} /> Sun–Thu, 9:00–4:00</p></div><div><p className="footer-label">Explore</p><a href="#notices">Notices</a><a href="#academics">Departments</a><a href="#admissions">Admissions</a><a href="#contact">Student portal</a></div></div><div className="shell footer-bottom"><span>© 2026 Narsingdi Government College</span><span>Designed for the next generation <span className="gold-dot">◆</span></span></div></footer>
    </main>
  );
}
