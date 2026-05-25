"use client";

export default function CodeGround() {
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
        .nav-logo {
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          font-size: 20px;
          color: #fff;
          cursor: pointer;
          letter-spacing: -0.01em;
          text-decoration: none;
        }
        .nav-right {
          display: flex;
          align-items: center;
        }
        .back-btn {
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
        .back-btn:hover {
          color: #fff;
          border-color: #666;
          background: rgba(255, 255, 255, 0.05);
        }

        main {
          max-width: 800px;
          margin: 0 auto;
          padding: 112px 40px 100px;
        }
        @media (max-width: 700px) { main { padding: 96px 24px 80px; } }
        
        .header-section {
          margin-bottom: 60px;
        }
        .heading {
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          font-size: clamp(30px, 6vw, 48px);
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .subheading {
          font-size: 14px; color: #999;
          max-width: 500px; line-height: 1.8;
        }

        .code-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }
        .code-card {
          background: #141414;
          border: 1px solid #252525;
          border-radius: 12px;
          padding: 24px;
          transition: all 0.2s ease;
        }
        .code-card:hover {
          border-color: #444;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .card-title {
          font-family: 'Nunito', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
        }
        .card-desc {
          font-size: 13px;
          color: #888;
          margin-bottom: 20px;
          line-height: 1.6;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .card-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #666;
          background: #1e1e1e;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .card-link {
          font-size: 12px;
          font-weight: 600;
          color: #bbb;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: color 0.2s;
        }
        .card-link:hover { color: #fff; }
      `}</style>

      <nav>
        <a href="/" className="nav-logo">vm.</a>
        <div className="nav-right">
          <a href="/" className="back-btn">Back to Portfolio</a>
        </div>
      </nav>

      <main>
        <div className="header-section">
          <h1 className="heading">Code Ground</h1>
          <p className="subheading">
            A collection of small scripts, experiments, and snippets that I&apos;ve built to solve specific problems or just for fun.
          </p>
        </div>

        <div className="code-grid">
          {/* Placeholder for a code snippet card */}
          <div className="code-card">
            <h2 className="card-title">Coming Soon</h2>
            <p className="card-desc">Showcase for little codes and scripts. Currently empty, but awesome things are on the way.</p>
            <div className="card-footer">
              <span className="card-tag">Draft</span>
              <a href="#" className="card-link" onClick={e => e.preventDefault()}>View Code <span>↗</span></a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
