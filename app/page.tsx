"use client";
import { useEffect, useRef, useState } from "react";

const NAV = ["About", "Skills", "Projects", "Experience", "Achievements", "Education", "Contact"];

const SKILLS = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    ]
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
    ]
  },
  {
    category: "Frameworks",
    items: [
      { name: "Next", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Node", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
    ]
  },
  {
    category: "Tools & Software",
    items: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    ]
  },
  {
    category: "Data Science & ML",
    items: [
      { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
      { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
    ]
  }
];

const PROJECTS = [
  {
    title: "Python Calculator",
    desc: "A command-line calculator built while learning Python fundamentals.",
    tags: ["Python"],
    link: "#",
  },
  {
    title: "Portfolio Website",
    desc: "This site. Built with Next.js, deployed on Vercel with a custom domain.",
    tags: ["Next.js", "Vercel"],
    link: "#",
  },
  {
    title: "ML Price Predictor",
    desc: "Coming soon — a house price prediction model using scikit-learn.",
    tags: ["Python", "ML"],
    link: "#",
  },
];

const EXPERIENCE = [
  {
    role: "Self-taught Developer",
    place: "Independent",
    period: "2025 — Present",
    desc: "Learning Python, backend development, and machine learning from scratch. Building real projects and deploying them to production.",
  },
];

const ACHIEVEMENTS = [
  "Deployed first full-stack project to production",
  "Built and launched personal portfolio at vivekmohod.fun",
];

const EDUCATION = [
  {
    degree: "B.Tech",
    school: "DBATU",
    period: "2024 — 2028",
  },
];

export default function Home() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    function onScroll() {
      const offset = window.scrollY + 120;
      let current = NAV[0];
      for (const section of NAV) {
        const el = sectionRefs.current[section];
        if (el && el.offsetTop <= offset) {
          current = section;
        }
      }
      setActive(current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(section: string) {
    if (section === "About") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      sectionRefs.current[section]?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #0c0c0c;
          color: #ccc;
          font-family: 'Nunito', sans-serif;
          font-size: 14px;
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
        }
        ::selection { background: #fff; color: #000; }

        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 56px;
          background: rgba(12,12,12,0.94);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid #1e1e1e;
        }
        .nav-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
        }
        .nav-logo {
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          font-size: 20px;
          color: #fff;
          cursor: pointer;
          letter-spacing: -0.01em;
          position: relative;
          z-index: 1;
        }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links button {
          background: none; border: none;
          font-family: 'Nunito', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #888;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
          position: relative;
        }
        .nav-links button::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 1px;
          background: #fff;
          transition: width 0.25s ease;
        }
        .nav-links button:hover { color: #ccc; }
        .nav-links button.active { color: #fff; }
        .nav-links button.active::after { width: 100%; }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          z-index: 1;
        }
        .code-ground-btn {
          font-family: 'Nunito', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #bbb;
          text-decoration: none;
          padding: 8px 16px;
          border: 1px solid #333;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .code-ground-btn:hover {
          color: #fff;
          border-color: #666;
          background: rgba(255, 255, 255, 0.05);
        }

        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; background: none; border: none; padding: 4px;
          position: relative; z-index: 1;
        }
        .hamburger span { display: block; width: 22px; height: 1px; background: #666; }

        .mobile-menu {
          display: none;
          position: fixed;
          top: 56px; left: 0; right: 0;
          background: #0c0c0c;
          border-bottom: 1px solid #1e1e1e;
          z-index: 99;
          padding: 24px 40px;
          flex-direction: column;
          gap: 22px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu button {
          background: none; border: none;
          font-family: 'Nunito', sans-serif;
          font-size: 12px; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; color: #888;
          cursor: pointer; text-align: left; padding: 0;
        }
        .mobile-menu button.active { color: #fff; }

        @media (max-width: 700px) {
          nav { padding: 0 24px; }
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { padding: 24px; }
        }

        main {
          max-width: 760px;
          margin: 0 auto;
          padding: 112px 40px 100px;
        }
        @media (max-width: 700px) { main { padding: 96px 24px 80px; } }

        section {
          padding: 56px 0;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 36px;
          margin-left: -48px;
        }
        @media (max-width: 700px) {
          .section-header { margin-left: -16px; }
        }

        .section-label {
          font-family: 'Nunito', sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: capitalize;
          color: #fff;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .section-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, #333, transparent);
        }

        .section-content {
          width: 100%;
        }

        /* INTRO */
        .intro-heading {
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          font-size: clamp(38px, 8vw, 68px);
          color: #fff;
          line-height: 1.06;
          letter-spacing: -0.025em;
          margin-bottom: 32px;
        }
        .intro-heading em { font-style: italic; color: #999; }
        .intro-body {
          font-size: 14px; color: #aaa;
          max-width: 440px; line-height: 1.85;
          margin-bottom: 40px;
        }
        .intro-body strong { color: #e0e0e0; font-weight: 600; }
        .status-pill {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; color: #999; letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .status-pill::before {
          content: '';
          width: 6px; height: 6px; border-radius: 50%;
          background: #2d6a2d;
          box-shadow: 0 0 8px #2d6a2d;
          animation: blink 2.4s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .status-row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }

        .intro-socials { display: flex; gap: 10px; margin-left: 6px; }
        .intro-social-icon {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid #252525;
          background: #141414;
          display: inline-flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .intro-social-icon svg { width: 16px; height: 16px; fill: #777; transition: fill 0.25s; }
        .intro-social-icon:hover { background: #fff; border-color: #fff; transform: translateY(-2px); box-shadow: 0 4px 16px rgba(255,255,255,0.06); }
        .intro-social-icon:hover svg { fill: #0c0c0c; }

        .contact-cta {
          background: none; border: 1px solid #333;
          color: #999; font-size: 16px;
          width: 32px; height: 32px;
          border-radius: 50%; cursor: pointer;
          display: inline-flex; align-items: center; justify-content: center;
          transition: all 0.25s ease;
        }
        .contact-cta:hover { background: #fff; color: #0c0c0c; border-color: #fff; transform: translate(2px, -2px); }

        /* SKILLS */
        .skills-categories { display: flex; flex-direction: column; gap: 40px; }
        .category-title { font-family: 'Nunito', sans-serif; font-size: 16px; font-weight: 700; color: #aaa; margin-bottom: 16px; }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 12px;
        }
        .skill-item {
          background: #141414; border: 1px solid #252525; border-radius: 12px;
          padding: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
          transition: all 0.2s ease;
        }
        .skill-item:hover { background: #1a1a1a; border-color: #444; transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.4); }
        .skill-icon { width: 36px; height: 36px; object-fit: contain; }
        .skill-name { font-size: 12px; color: #999; font-weight: 600; text-align: center; }
        /* invert colors for icons that might be black by default on dark backgrounds (like Next.js, Express, GitHub) */
        img[alt="Next"], img[alt="Express"], img[alt="GitHub"] { filter: invert(0.8) brightness(2); }

        /* PROJECTS */
        .project-item {
          padding: 30px 0;
          border-bottom: 1px solid #131313;
          display: grid;
          grid-template-columns: 1fr 24px;
          gap: 16px;
          align-items: start;
          text-decoration: none;
          transition: all 0.15s;
        }
        .project-item:last-child { border-bottom: none; }
        .project-item:hover .project-title { color: #fff; }
        .project-title {
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          font-size: 22px; color: #bbb;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
          transition: color 0.15s;
        }
        .project-desc { font-size: 13px; color: #999; line-height: 1.75; margin-bottom: 14px; }
        .project-tags { display: flex; gap: 8px; flex-wrap: wrap; }
        .tag {
          font-size: 9px; letter-spacing: 0.12em;
          text-transform: uppercase; color: #888;
          border: 1px solid #333; padding: 3px 8px; font-weight: 600;
        }
        .project-arrow { font-size: 16px; color: #666; transition: color 0.15s, transform 0.15s; margin-top: 6px; }
        .project-item:hover .project-arrow { color: #ccc; transform: translate(2px,-2px); }

        /* EXPERIENCE */
        .exp-item { padding: 30px 0; border-bottom: 1px solid #1a1a1a; }
        .exp-item:last-child { border-bottom: none; }
        .exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; flex-wrap: wrap; gap: 8px; }
        .exp-role { font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 20px; color: #bbb; }
        .exp-period { font-size: 10px; color: #888; letter-spacing: 0.1em; font-weight: 600; }
        .exp-place { font-size: 10px; color: #888; margin-bottom: 12px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; }
        .exp-desc { font-size: 13px; color: #999; line-height: 1.8; }

        /* ACHIEVEMENTS */
        .achievements-list { counter-reset: item; }
        .achievement-item {
          padding: 20px 0;
          border-bottom: 1px solid #1a1a1a;
          display: flex; gap: 24px; align-items: baseline;
          font-size: 13px; color: #aaa;
        }
        .achievement-item:last-child { border-bottom: none; }
        .achievement-item::before {
          content: '0' counter(item);
          counter-increment: item;
          font-size: 10px; color: #666;
          letter-spacing: 0.12em; flex-shrink: 0; font-weight: 700;
        }

        /* EDUCATION */
        .edu-item { padding: 26px 0; border-bottom: 1px solid #1a1a1a; }
        .edu-item:last-child { border-bottom: none; }
        .edu-degree { font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 20px; color: #bbb; margin-bottom: 6px; }
        .edu-meta { font-size: 10px; color: #888; letter-spacing: 0.08em; font-weight: 600; }

        /* CONTACT */
        .contact-heading {
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          font-size: clamp(30px, 6vw, 50px);
          color: #fff; line-height: 1.08;
          letter-spacing: -0.02em; margin-bottom: 20px;
        }
        .contact-sub { font-size: 13px; color: #999; margin-bottom: 44px; line-height: 1.85; max-width: 400px; }

        .contact-form {
          display: flex; flex-direction: column; gap: 20px;
          margin-bottom: 52px;
        }
        .form-row { display: flex; gap: 16px; }
        @media (max-width: 500px) { .form-row { flex-direction: column; } }
        .form-group { display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .form-group label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: #777;
        }
        .form-group input, .form-group textarea {
          background: #141414; border: 1px solid #252525;
          border-radius: 10px; padding: 14px 16px;
          font-family: 'Nunito', sans-serif; font-size: 13px;
          color: #ddd; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          resize: vertical;
        }
        .form-group input::placeholder, .form-group textarea::placeholder { color: #444; }
        .form-group input:focus, .form-group textarea:focus {
          border-color: #444; box-shadow: 0 0 0 3px rgba(255,255,255,0.04);
        }
        .form-submit {
          align-self: flex-start;
          background: #252525; color: #ddd;
          border: 1px solid #333; border-radius: 10px;
          padding: 13px 36px;
          font-family: 'Nunito', sans-serif;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .form-submit:hover { background: #333; color: #fff; transform: translateY(-1px); border-color: #555; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }

        .contact-socials-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: #555; margin-bottom: 20px;
        }
        .contact-icons { display: flex; gap: 16px; flex-wrap: wrap; }
        .contact-icon {
          width: 52px; height: 52px;
          border-radius: 50%;
          border: 1px solid #252525;
          background: #141414;
          display: inline-flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .contact-icon svg { width: 20px; height: 20px; fill: #888; transition: fill 0.25s; }
        .contact-icon:hover { background: #fff; border-color: #fff; transform: translateY(-3px); box-shadow: 0 6px 24px rgba(255,255,255,0.08); }
        .contact-icon:hover svg { fill: #0c0c0c; }

        .footer {
          text-align: center;
          padding: 40px 0 0;
          font-size: 10px;
          color: #666;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
        }
      `}</style>

      <nav>
        <span className="nav-logo" onClick={() => scrollTo("About")}>vm.</span>
        <div className="nav-center">
          <ul className="nav-links">
            {NAV.map(s => (
              <li key={s}>
                <button className={active === s ? "active" : ""} onClick={() => scrollTo(s)}>{s}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-right">
          <a href="/code-ground" className="code-ground-btn">Code Ground</a>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV.map(s => (
          <button key={s} className={active === s ? "active" : ""} onClick={() => scrollTo(s)}>{s}</button>
        ))}
      </div>

      <main>

        <section ref={el => { sectionRefs.current["About"] = el; }}>
          <div className="intro-wrapper">
            <h1 className="intro-heading">
              Vivek Mohod.<br />
              <em>Developer &amp; Builder.</em>
            </h1>
            <p className="intro-body">
              I build <strong>backend systems</strong>, <strong>ML models</strong>, and things that run on the web.
              Currently learning Python and working toward my first dev role.
            </p>
            <div className="status-row">
              <span className="status-pill">Open to opportunities</span>
              <button className="contact-cta" onClick={() => scrollTo("Contact")} aria-label="Go to contact">↗</button>
              <div className="intro-socials">
                <a href="mailto:viveksmohod7262@gmail.com" className="intro-social-icon" aria-label="Email" title="Email">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </a>
                <a href="https://github.com/guru7262" target="_blank" rel="noopener noreferrer" className="intro-social-icon" aria-label="GitHub" title="GitHub">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/vivek-mohod" target="_blank" rel="noopener noreferrer" className="intro-social-icon" aria-label="LinkedIn" title="LinkedIn">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="/resume.pdf" className="intro-social-icon" aria-label="Resume" title="Resume">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-6-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section ref={el => { sectionRefs.current["Skills"] = el; }}>
          <div className="section-header">
            <p className="section-label">Skills</p>
            <div className="section-line" />
          </div>
          <div className="section-content">
            <div className="skills-categories">
              {SKILLS.map(cat => (
                <div className="skill-category" key={cat.category}>
                  <h3 className="category-title">{cat.category}</h3>
                  <div className="skills-grid">
                    {cat.items.map(s => (
                      <div className="skill-item" key={s.name}>
                        <img src={s.icon} alt={s.name} className="skill-icon" />
                        <span className="skill-name">{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={el => { sectionRefs.current["Projects"] = el; }}>
          <div className="section-header">
            <p className="section-label">Projects</p>
            <div className="section-line" />
          </div>
          <div className="section-content">
            {PROJECTS.map(p => (
              <a href={p.link} className="project-item" key={p.title}>
                <div>
                  <div className="project-title">{p.title}</div>
                  <div className="project-desc">{p.desc}</div>
                  <div className="project-tags">
                    {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </div>
                <span className="project-arrow">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section ref={el => { sectionRefs.current["Experience"] = el; }}>
          <div className="section-header">
            <p className="section-label">Experience</p>
            <div className="section-line" />
          </div>
          <div className="section-content">
            {EXPERIENCE.map(e => (
              <div className="exp-item" key={e.role}>
                <div className="exp-header">
                  <span className="exp-role">{e.role}</span>
                  <span className="exp-period">{e.period}</span>
                </div>
                <div className="exp-place">{e.place}</div>
                <div className="exp-desc">{e.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section ref={el => { sectionRefs.current["Achievements"] = el; }}>
          <div className="section-header">
            <p className="section-label">Achievements</p>
            <div className="section-line" />
          </div>
          <div className="section-content">
            <div className="achievements-list">
              {ACHIEVEMENTS.map(a => (
                <div className="achievement-item" key={a}>{a}</div>
              ))}
            </div>
          </div>
        </section>

        <section ref={el => { sectionRefs.current["Education"] = el; }}>
          <div className="section-header">
            <p className="section-label">Education</p>
            <div className="section-line" />
          </div>
          <div className="section-content">
            {EDUCATION.map(e => (
              <div className="edu-item" key={e.degree}>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-meta">{e.school} · {e.period}</div>
              </div>
            ))}
          </div>
        </section>

        <section ref={el => { sectionRefs.current["Contact"] = el; }}>
          <div className="section-header">
            <p className="section-label">Contact</p>
            <div className="section-line" />
          </div>
          <div className="section-content">
            <h2 className="contact-heading">
              Let&apos;s work<br />
              <em style={{ fontStyle: "italic", color: "#555" }}>together.</em>
            </h2>
            <p className="contact-sub">
              Actively looking for my first role in backend or ML engineering.<br />
              Open to internships, junior roles, and freelance projects.
            </p>

            <form className="contact-form" onSubmit={e => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" type="text" placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" placeholder="you@example.com" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows={5} placeholder="Tell me about your project or opportunity..." />
              </div>
              <button type="submit" className="form-submit">Send Message</button>
            </form>

            <p className="contact-socials-label">Find me online</p>
            <div className="contact-icons">
              <a href="mailto:viveksmohod7262@gmail.com" className="contact-icon" aria-label="Email" title="Email">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
              <a href="https://github.com/guru7262" target="_blank" rel="noopener noreferrer" className="contact-icon" aria-label="GitHub" title="GitHub">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/vivek-mohod" target="_blank" rel="noopener noreferrer" className="contact-icon" aria-label="LinkedIn" title="LinkedIn">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="/resume.pdf" className="contact-icon" aria-label="Resume" title="Resume">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-6-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
              </a>
            </div>
          </div>
        </section>

        <div className="footer">vivekmohod.fun · {new Date().getFullYear()}</div>

      </main>
    </>
  );
}