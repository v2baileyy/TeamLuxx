import React, { useState, useEffect, useRef, useMemo } from "react";

// --- DATA ---
const CROWN_PATH =
  "M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z";

const ROSTER = {
  owners: [
    {
      id: "phe",
      name: "Phe",
      handle: "@lolitsphe",
      role: "Owner",
      link: "https://tiktok.com/@lolitsphe",
      image: "",
      bio: "Owner of Team Luxx focused on building a premium esports identity, growing the team, and leading the brand forward.",
      followers: "--",
    },
    {
      id: "gia",
      name: "Gia",
      handle: "@starlitgiaxo",
      role: "Owner",
      link: "https://tiktok.com/@starlitgiaxo",
      image:
        "https://i.pinimg.com/originals/81/6a/98/816a987a5203f09d984e7a3ace513f4e.jpg",
      bio: "Co-owner of Team Luxx helping lead team direction, content vision, and community presence.",
      followers: "--",
    },
  ],
  staff: [
    {
      id: "awoken",
      name: "Awoken",
      handle: "@awoken1738",
      role: "Moderator",
      link: "https://tiktok.com/@awoken1738",
      image: "",
      bio: "Moderator supporting the team and helping keep the community active and organized.",
      followers: "--",
    },
    {
      id: "rose",
      name: "Rose",
      handle: "@xsvrosettv",
      role: "Moderator",
      link: "https://tiktok.com/@xsvrosettv",
      image: "",
      bio: "Moderator helping maintain the Luxx atmosphere and support team operations.",
      followers: "--",
    },
    {
      id: "bailey",
      name: "Bailey",
      handle: "@v2baileyy",
      role: "Discord Mod",
      link: "https://tiktok.com/@v2baileyy",
      image: "",
      bio: "Discord mod helping with team communication, moderation, and member support.",
      followers: "--",
    },
  ],
  members: [
    {
      id: "sophia",
      name: "Sophia",
      handle: "@shywallflower14",
      role: "Member",
      link: "https://tiktok.com/@shywallflower14",
      image: "",
      bio: "Team Luxx member contributing to the squad’s growing roster and presence.",
      followers: "--",
    },
    {
      id: "bootz",
      name: "Bootz",
      handle: "@b00tzinaction",
      role: "Member",
      link: "https://tiktok.com/@b00tzinaction",
      image: "",
      bio: "Luxx squad member bringing activity, content, and community presence.",
      followers: "--",
    },
    {
      id: "star",
      name: "Star",
      handle: "@star_e25",
      role: "Member",
      link: "https://tiktok.com/@star_e25",
      image: "",
      bio: "Active Team Luxx member helping build the identity of the squad.",
      followers: "--",
    },
    {
      id: "kian",
      name: "Kian",
      handle: "@ttvphantom7x",
      role: "Member",
      link: "https://tiktok.com/@ttvphantom7x",
      image: "",
      bio: "Team Luxx member focused on growth, gaming, and standing out in the roster.",
      followers: "--",
    },
    {
      id: "twisttz",
      name: "Twisttz",
      handle: "@iamtwisttz",
      role: "Member",
      link: "https://tiktok.com/@iamtwisttz",
      image: "",
      bio: "Luxx member bringing personality, potential, and team presence.",
      followers: "--",
    },
    {
      id: "reapzzy",
      name: "Reapzzy",
      handle: "@reapzzy_fn",
      role: "Member",
      link: "https://tiktok.com/@reapzzy_fn",
      image: "",
      bio: "Competitive-focused Team Luxx member helping build the squad image.",
      followers: "--",
    },
    {
      id: "angel",
      name: "Angel",
      handle: "@luvgojocream",
      role: "Member",
      link: "https://www.tiktok.com/@luvgojocream",
      image: "",
      bio: "Luxx member contributing to the team’s growing content and community side.",
      followers: "--",
    },
    {
      id: "marz",
      name: "Marz",
      handle: "@ifearurfate",
      role: "Member",
      link: "https://tiktok.com/@ifearurfate",
      image: "",
      bio: "Team Luxx member helping expand the squad’s overall reach and identity.",
      followers: "--",
    },
    {
      id: "jasmine",
      name: "r1jasmine",
      handle: "@r1jasmine",
      role: "Member",
      link: "https://www.tiktok.com/@r1jasmine",
      image: "",
      bio: "Active member of Team Luxx with a place in the roster’s growth.",
      followers: "--",
    },
    {
      id: "zb",
      name: "zb.jsn",
      handle: "@zb.jsn",
      role: "Member",
      link: "https://www.tiktok.com/@zb.jsn",
      image: "",
      bio: "Luxx member adding to the roster depth and team presence.",
      followers: "--",
    },
  ],
};

// --- COMPONENTS ---

const DefaultAvatar = () => (
  <svg
    width="42"
    height="42"
    fill="none"
    stroke="rgba(255,255,255,0.35)"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const RosterCard = ({ member, onClick }) => {
  const cardRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const isOwner = member.role.toLowerCase() === "owner";

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = x / rect.width;
    const py = y / rect.height;

    const ry = (px - 0.5) * 16;
    const rx = (0.5 - py) * 16;

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
    card.classList.add("tilted");
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", `0deg`);
    card.style.setProperty("--ry", `0deg`);
    card.classList.remove("tilted");
  };

  return (
    <div
      ref={cardRef}
      className="premium-card spotlight-card profile-trigger"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(member)}
    >
      <div className="card-inner">
        <div className="card-avatar">
          {member.image && !imgError ? (
            <img
              src={member.image}
              alt={member.name}
              onError={() => setImgError(true)}
            />
          ) : (
            <DefaultAvatar />
          )}
        </div>

        <div className="card-name">
          {member.name}
          {isOwner && (
            <svg
              width="16"
              height="16"
              fill="#22d3ee"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d={CROWN_PATH} />
            </svg>
          )}
        </div>

        <div className="card-handle">{member.handle}</div>
        <div className="card-role">{member.role}</div>

        <a
          href={member.link}
          className="card-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          TikTok
        </a>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Refs for Parallax Galaxy
  const nebulaRef = useRef(null);
  const starsRef = useRef(null);
  const gridRef = useRef(null);

  // Handle Scroll & Parallax Mouse
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      if (nebulaRef.current)
        nebulaRef.current.style.transform = `translateY(${
          y * 0.1
        }px) scale(1.05)`;
      if (starsRef.current)
        starsRef.current.style.transform = `translateY(${
          y * 0.18
        }px) scale(1.02)`;
      if (gridRef.current)
        gridRef.current.style.transform = `translateY(${y * 0.06}px)`;
    };

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      if (nebulaRef.current) {
        nebulaRef.current.style.left = `${x * 12}px`;
        nebulaRef.current.style.top = `${y * 12}px`;
      }
      if (starsRef.current) {
        starsRef.current.style.left = `${x * 20}px`;
        starsRef.current.style.top = `${y * 20}px`;
      }
      if (gridRef.current) {
        gridRef.current.style.left = `${x * 8}px`;
        gridRef.current.style.top = `${y * 8}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProfile(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when menu or modal is open
  useEffect(() => {
    if (menuOpen || selectedProfile) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [menuOpen, selectedProfile]);

  // Generate Stars
  const backgroundStars = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      opacity: Math.random().toFixed(2),
      size: `${Math.random() * 2 + 1}px`,
    }));
  }, []);

  // Modal Render Logic
  const renderProfileModal = () => {
    if (!selectedProfile) return null;

    const isOwner = selectedProfile.role.toLowerCase() === "owner";

    return (
      <div
        className="profile-modal-overlay open"
        onClick={() => setSelectedProfile(null)}
      >
        <div className="profile-modal-box" onClick={(e) => e.stopPropagation()}>
          <button
            className="profile-close"
            onClick={() => setSelectedProfile(null)}
            aria-label="Close profile"
          >
            ✕
          </button>

          <div className="profile-layout">
            <div className="profile-left">
              <div className="profile-avatar">
                {selectedProfile.image ? (
                  <img
                    src={selectedProfile.image}
                    alt={selectedProfile.name}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                ) : null}
                {(!selectedProfile.image || true) && (
                  <DefaultAvatar
                    style={{
                      display: selectedProfile.image ? "none" : "block",
                    }}
                  />
                )}
              </div>
            </div>

            <div className="profile-right">
              <div className="profile-role">{selectedProfile.role}</div>
              <h2 className="profile-name">
                {selectedProfile.name}
                {isOwner && (
                  <svg
                    width="24"
                    height="24"
                    fill="#22d3ee"
                    viewBox="0 0 24 24"
                    style={{ marginLeft: 8 }}
                    aria-hidden="true"
                  >
                    <path d={CROWN_PATH} />
                  </svg>
                )}
              </h2>
              <div className="profile-handle">{selectedProfile.handle}</div>

              <div className="profile-bio">
                {selectedProfile.bio || "Team Luxx member."}
              </div>

              <div className="profile-stats">
                <div className="profile-stat">
                  <strong>{selectedProfile.followers || "--"}</strong>
                  <span>TikTok Followers</span>
                </div>
                <div className="profile-stat">
                  <strong>Active</strong>
                  <span>Status</span>
                </div>
              </div>

              <div className="profile-actions">
                <a
                  href={selectedProfile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Open TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      <div className="galaxy-bg" aria-hidden="true">
        <div className="galaxy-layer galaxy-nebula" ref={nebulaRef}></div>
        <div className="galaxy-layer galaxy-stars" ref={starsRef}></div>
        <div className="galaxy-layer galaxy-grid" ref={gridRef}></div>
      </div>

      <div className="scan-lines"></div>

      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <a className="nav-logo" href="#home">
            <img
              src="https://customer-assets.emergentagent.com/job_neon-luxx/artifacts/2jnpaax9_C01A0F60-D3B1-4666-99D2-A8CCDDFE1BB8.webp"
              alt="Team Luxx logo"
            />
            <span className="nav-logo-text">
              TEAM <span>LUXX</span>
            </span>
          </a>

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#roster">Roster</a>
            <a href="#socials">Socials</a>
            <a href="#join">Join</a>
          </div>

          <button
            className="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                width="30"
                height="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="30"
                height="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={menuOpen ? "open" : ""}>
        <a href="#home" onClick={() => setMenuOpen(false)}>
          Home
        </a>
        <a href="#about" onClick={() => setMenuOpen(false)}>
          About
        </a>
        <a href="#roster" onClick={() => setMenuOpen(false)}>
          Roster
        </a>
        <a href="#socials" onClick={() => setMenuOpen(false)}>
          Socials
        </a>
        <a href="#join" onClick={() => setMenuOpen(false)}>
          Join
        </a>
      </div>

      <header id="home">
        <div className="bg-grid"></div>
        <div className="stars">
          {backgroundStars.map((s) => (
            <div
              key={s.id}
              className="star"
              style={{
                left: s.left,
                top: s.top,
                animationDelay: s.animationDelay,
                opacity: s.opacity,
                width: s.size,
                height: s.size,
              }}
            />
          ))}
        </div>
        <div className="glow-orb glow-a"></div>
        <div className="glow-orb glow-b"></div>

        <div className="container">
          <div className="hero-layout">
            <div className="hero-copy">
              <div className="eyebrow">The Next Generation of Esports</div>
              <h1 className="hero-title">
                TEAM <span>LUXX</span>
              </h1>
              <p className="hero-sub">
                Built for players, creators, and community. Team Luxx is where
                elite gaming, content, and premium branding come together.
              </p>

              <div className="hero-actions">
                <a href="#roster" className="btn-primary">
                  View Roster
                </a>
                <a href="#join" className="btn-secondary">
                  Join Team
                </a>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <strong>16+</strong>
                  <span>Members</span>
                </div>
                <div className="hero-stat">
                  <strong>2</strong>
                  <span>Owners</span>
                </div>
                <div className="hero-stat">
                  <strong>24/7</strong>
                  <span>Growth</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-frame">
                <div className="bg-grid"></div>

                <div className="floating-tag tag-1">
                  <strong>Premium</strong>
                  Brand Identity
                </div>

                <div className="floating-tag tag-2">
                  <strong>Roster</strong>
                  Players & Creators
                </div>

                <div className="floating-tag tag-3">
                  <strong>Community</strong>
                  Built to Grow
                </div>

                <div className="floating-tag tag-4">
                  <strong>Luxx</strong>
                  Shine Different
                </div>

                <div className="hero-logo-center">
                  <div className="hero-logo-disc">
                    <img
                      src="https://customer-assets.emergentagent.com/job_neon-luxx/artifacts/2jnpaax9_C01A0F60-D3B1-4666-99D2-A8CCDDFE1BB8.webp"
                      alt="Team Luxx"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="about">
        <div className="container">
          <div className="section-head">
            <h2>About Team Luxx</h2>
            <div className="section-line"></div>
            <div className="section-sub">The Light in the Dark</div>
          </div>

          <div className="about-wrap">
            <div className="panel about-copy">
              <h3>Not just a team. A statement.</h3>
              <p>
                Team Luxx is a competitive gaming and content organization built
                around style, talent, consistency, and presence.
              </p>
              <p>
                The name <span>Luxx</span> stands for being the light in the
                dark — showing up, standing out, and rising through every
                challenge.
              </p>
              <p>
                From players to creators to community leaders, Luxx is designed
                to feel premium, look elite, and keep growing with purpose.
              </p>
            </div>

            <div className="panel about-stats">
              <div className="about-stats-grid">
                <div className="stat-tile">
                  <strong>16+</strong>
                  <span>Active Members</span>
                </div>
                <div className="stat-tile">
                  <strong>2</strong>
                  <span>Owners</span>
                </div>
                <div className="stat-tile">
                  <strong>3</strong>
                  <span>Staff</span>
                </div>
                <div className="stat-tile">
                  <strong>Elite</strong>
                  <span>Brand Focus</span>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-band">
            <div className="feature-box panel">
              <h4>Competitive</h4>
              <p>
                Focused on performance, improvement, and presence in the scene.
              </p>
            </div>
            <div className="feature-box panel">
              <h4>Creative</h4>
              <p>
                Built for creators, edits, clips, streams, and social growth.
              </p>
            </div>
            <div className="feature-box panel">
              <h4>Community</h4>
              <p>
                Positive energy, support, and a team that actually feels
                connected.
              </p>
            </div>
            <div className="feature-box panel">
              <h4>Premium</h4>
              <p>Luxx is made to look polished, modern, and unforgettable.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="roster">
        <div className="container">
          <div className="section-head">
            <h2>Our Roster</h2>
            <div className="section-line"></div>
            <div className="section-sub">The Elites</div>
          </div>

          <div className="roster-group">
            <div className="roster-group-title">Owners</div>
            <div className="roster-grid">
              {ROSTER.owners.map((member) => (
                <RosterCard
                  key={member.id}
                  member={member}
                  onClick={setSelectedProfile}
                />
              ))}
            </div>
          </div>

          <div className="roster-group">
            <div className="roster-group-title">Staff</div>
            <div className="roster-grid">
              {ROSTER.staff.map((member) => (
                <RosterCard
                  key={member.id}
                  member={member}
                  onClick={setSelectedProfile}
                />
              ))}
            </div>
          </div>

          <div className="roster-group">
            <div className="roster-group-title">Members</div>
            <div className="roster-grid">
              {ROSTER.members.map((member) => (
                <RosterCard
                  key={member.id}
                  member={member}
                  onClick={setSelectedProfile}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="socials">
        <div className="marquee-wrap">
          <div className="marquee-track">
            <span>TEAM LUXX</span>
            <span>ESPORTS</span>
            <span>CONTENT</span>
            <span>COMMUNITY</span>
            <span>PREMIUM</span>
            <span>DOMINATE</span>
            <span>TEAM LUXX</span>
            <span>ESPORTS</span>
            <span>CONTENT</span>
            <span>COMMUNITY</span>
            <span>PREMIUM</span>
            <span>DOMINATE</span>
          </div>
        </div>

        <div className="container">
          <div className="social-cta">
            <h3>Stay Connected</h3>
            <p>
              Follow the team, support the members, and keep up with everything
              Team Luxx is building across content and community.
            </p>
            <a
              href="https://tiktok.com/@luxxesports"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Follow on TikTok
            </a>
          </div>
        </div>
      </section>

      <section id="join">
        <div className="container">
          <div className="section-head">
            <h2>Join Team Luxx</h2>
            <div className="section-line"></div>
            <div className="section-sub">Shine With Us</div>
          </div>

          <div className="join-wrap">
            <div className="panel join-panel">
              <h3>What we look for</h3>
              <p>
                We’re always looking for dedicated people who bring skill,
                consistency, creativity, and a real team mindset.
              </p>

              <ul className="join-list">
                <li>Active on TikTok, Twitch, or gaming platforms</li>
                <li>Strong attitude and positive team energy</li>
                <li>Consistent uploads, clips, streams, or activity</li>
                <li>Serious interest in growing with the brand</li>
              </ul>
            </div>

            <div className="panel join-actions">
              <h3>Reach out to join</h3>
              <p>
                Want in? Contact one of the owners directly and introduce
                yourself with your socials, content, or gaming background.
              </p>

              <div className="contact-stack">
                <a
                  href="https://tiktok.com/@lolitsphe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn"
                >
                  <div>
                    <strong>Contact Phe</strong>
                    <span>Owner</span>
                  </div>
                  <div>↗</div>
                </a>

                <a
                  href="https://tiktok.com/@starlitgiaxo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn"
                >
                  <div>
                    <strong>Contact Gia</strong>
                    <span>Owner</span>
                  </div>
                  <div>↗</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-wrap">
            <div className="footer-brand">
              <img
                src="https://customer-assets.emergentagent.com/job_neon-luxx/artifacts/2jnpaax9_C01A0F60-D3B1-4666-99D2-A8CCDDFE1BB8.webp"
                alt="Team Luxx"
              />
              <div>
                <strong>TEAM LUXX ESPORTS</strong>
                <span>The light in the dark.</span>
              </div>
            </div>

            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#roster">Roster</a>
              <a href="#socials">Socials</a>
              <a href="#join">Join</a>
            </div>

            <div className="footer-copy">
              © {new Date().getFullYear()} Team Luxx Esports. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>

      {renderProfileModal()}
    </>
  );
}

// --- STYLES ---
const cssStyles = `
  :root {
    --bg: #030014;
    --text-dim: #8c92a8;
    --cyan: #22d3ee;
    --white-soft: rgba(255,255,255,0.76);
    --shadow: 0 18px 60px rgba(0,0,0,0.45);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; overflow-x: hidden; }

  body {
    background:
      radial-gradient(circle at top, rgba(34,211,238,0.08), transparent 22%),
      radial-gradient(circle at 80% 20%, rgba(90,44,255,0.12), transparent 22%),
      linear-gradient(180deg, #06011c 0%, #030014 35%, #02000d 100%);
    color: white;
    font-family: 'Rajdhani', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Force all headings and bold text to be white to override external CSS */
  h1, h2, h3, h4, h5, h6, strong {
    color: #ffffff !important;
  }

  body.menu-open,
  body.modal-open {
    overflow: hidden;
  }

  a { color: inherit; text-decoration: none; }
  section, header { scroll-margin-top: 100px; }

  .scan-lines {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 999;
    opacity: 0.03;
    background:
      linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%),
      linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06));
    background-size: 100% 4px, 3px 100%;
  }

  .bg-grid {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-size: 44px 44px;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
    mask-image: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0.2), transparent);
    -webkit-mask-image: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0.2), transparent);
  }

  .galaxy-bg {
    position: fixed;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .galaxy-layer {
    position: absolute;
    inset: -10%;
    will-change: transform;
  }

  .galaxy-nebula {
    background:
      radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.12), transparent 18%),
      radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.14), transparent 20%),
      radial-gradient(circle at 60% 70%, rgba(59, 130, 246, 0.10), transparent 18%),
      radial-gradient(circle at 30% 80%, rgba(168, 85, 247, 0.10), transparent 16%);
    filter: blur(30px);
    transform: translateZ(0);
  }

  .galaxy-stars {
    background-image:
      radial-gradient(rgba(255,255,255,0.95) 1px, transparent 1px),
      radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),
      radial-gradient(rgba(34,211,238,0.7) 1px, transparent 1px);
    background-size: 180px 180px, 260px 260px, 320px 320px;
    background-position: 0 0, 40px 80px, 100px 40px;
    opacity: 0.35;
  }

  .galaxy-grid {
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(circle at center, rgba(255,255,255,0.7), transparent 85%);
    -webkit-mask-image: radial-gradient(circle at center, rgba(255,255,255,0.7), transparent 85%);
    opacity: 0.2;
  }

  .glow-orb {
    position: absolute;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    opacity: 0.18;
    z-index: 0;
  }

  .glow-a {
    top: -100px;
    left: -120px;
    background: #22d3ee;
  }

  .glow-b {
    right: -120px;
    top: 180px;
    background: #7c3aed;
  }

  .stars {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 1;
  }

  .star {
    position: absolute;
    background: rgba(255,255,255,0.75);
    border-radius: 50%;
    animation: twinkle 4s ease-in-out infinite;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.8); }
  }

  .container {
    width: min(1200px, calc(100% - 40px));
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  #navbar,
  header,
  section,
  footer {
    position: relative;
    z-index: 2;
  }

  #navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding: 22px 0;
    transition: 0.35s ease;
  }

  #navbar.scrolled {
    background: rgba(3, 0, 20, 0.82);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(34,211,238,0.12);
    box-shadow: 0 8px 40px rgba(0,0,0,0.3);
    padding: 12px 0;
  }

  .nav-inner {
    width: min(1200px, calc(100% - 40px));
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .nav-logo {
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }

  .nav-logo img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid rgba(34,211,238,0.35);
    box-shadow: 0 0 18px rgba(34,211,238,0.25);
  }

  .nav-logo-text {
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    font-size: 20px;
    letter-spacing: -0.04em;
    color: #ffffff !important;
  }

  .nav-logo-text span { color: var(--cyan); }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 28px;
  }

  .nav-links a {
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: rgba(255,255,255,0.7);
    position: relative;
    padding-bottom: 5px;
    transition: 0.25s ease;
  }

  .nav-links a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background: var(--cyan);
    box-shadow: 0 0 12px var(--cyan);
    transition: width 0.25s ease;
  }

  .nav-links a:hover {
    color: white;
  }

  .nav-links a:hover::after {
    width: 100%;
  }

  .hamburger {
    display: none;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    z-index: 1001;
  }

  #mobile-menu {
    position: fixed;
    inset: 0;
    display: none;
    opacity: 0;
    pointer-events: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    background: rgba(3,0,20,0.96);
    backdrop-filter: blur(14px);
    z-index: 999;
    transition: opacity 0.3s ease;
  }

  #mobile-menu.open {
    display: flex;
    opacity: 1;
    pointer-events: auto;
  }

  #mobile-menu a {
    font-family: 'Orbitron', sans-serif;
    font-size: 24px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: white;
  }

  #home {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 120px 0 60px;
  }

  .hero-layout {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 50px;
    align-items: center;
  }

  .hero-copy {
    position: relative;
    z-index: 2;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
    color: var(--cyan);
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .eyebrow::before {
    content: "";
    width: 40px;
    height: 2px;
    background: var(--cyan);
    box-shadow: 0 0 10px var(--cyan);
  }

  .hero-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(52px, 9vw, 100px);
    font-weight: 900;
    line-height: 0.95;
    margin-bottom: 18px;
    letter-spacing: -0.05em;
  }

  .hero-title span {
    display: block;
    color: var(--cyan);
    text-shadow: 0 0 18px rgba(34,211,238,0.25);
  }

  .hero-sub {
    max-width: 620px;
    font-size: 20px;
    line-height: 1.5;
    color: var(--text-dim);
    margin-bottom: 30px;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-bottom: 34px;
  }

  .btn-primary,
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px 26px;
    font-family: 'Orbitron', sans-serif;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    transition: 0.3s ease;
    cursor: pointer;
    border: none;
  }

  .btn-primary {
    background: var(--cyan);
    color: #030014;
    box-shadow: 0 10px 30px rgba(34,211,238,0.18);
    border-radius: 4px;
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 20px rgba(34,211,238,0.4);
  }

  .btn-secondary {
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.04);
    color: white;
    border-radius: 4px;
  }

  .btn-secondary:hover {
    transform: translateY(-3px);
    border-color: rgba(34,211,238,0.4);
    background: rgba(34,211,238,0.08);
  }

  .hero-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    max-width: 720px;
  }

  .hero-stat {
    padding: 18px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    border-radius: 18px;
    box-shadow: var(--shadow);
  }

  .hero-stat strong {
    display: block;
    font-family: 'Orbitron', sans-serif;
    font-size: 26px;
    margin-bottom: 6px;
  }

  .hero-stat span {
    color: var(--text-dim);
    font-size: 14px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .hero-visual {
    position: relative;
    min-height: 560px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-frame {
    position: relative;
    width: min(100%, 480px);
    aspect-ratio: 1 / 1.1;
    border-radius: 32px;
    border: 1px solid rgba(34,211,238,0.16);
    background:
      linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)),
      rgba(5, 2, 20, 0.8);
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.02) inset,
      0 30px 80px rgba(0,0,0,0.45);
  }

  .hero-frame::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(130deg, rgba(34,211,238,0.65), transparent 30%, transparent 70%, rgba(124,58,237,0.65));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: borderSpin 6s linear infinite;
    pointer-events: none;
  }

  @keyframes borderSpin {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }

  .hero-frame .bg-grid {
    opacity: 0.8;
  }

  .hero-logo-center {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .hero-logo-disc {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    border: 2px solid rgba(34,211,238,0.3);
    background: radial-gradient(circle at 30% 30%, rgba(34,211,238,0.18), rgba(10,5,32,0.95));
    box-shadow:
      0 0 60px rgba(34,211,238,0.18),
      inset 0 0 40px rgba(255,255,255,0.03);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .hero-logo-disc img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .floating-tag {
    position: absolute;
    padding: 12px 14px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(5, 2, 20, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow);
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--white-soft);
    z-index: 3;
  }

  .floating-tag strong {
    display: block;
    color: white;
    font-size: 16px;
    margin-bottom: 6px;
    letter-spacing: 0;
  }

  .tag-1 { top: 40px; left: 20px; animation: bob 4s ease-in-out infinite; }
  .tag-2 { top: 110px; right: 16px; animation: bob 5s ease-in-out infinite; }
  .tag-3 { bottom: 40px; left: 30px; animation: bob 4.6s ease-in-out infinite; }
  .tag-4 { bottom: 110px; right: 24px; animation: bob 5.4s ease-in-out infinite; }

  @keyframes bob {
    0%,100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  section {
    position: relative;
    padding: 110px 0;
  }

  .section-head {
    text-align: center;
    margin-bottom: 60px;
  }

  .section-head h2 {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(32px, 4vw, 48px);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 12px;
    color: #ffffff !important;
  }

  .section-line {
    width: 64px;
    height: 4px;
    margin: 0 auto 12px;
    background: var(--cyan);
    box-shadow: 0 0 14px var(--cyan);
  }

  .section-sub {
    color: var(--cyan);
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.28em;
    text-transform: uppercase;
  }

  .panel {
    position: relative;
    border-radius: 28px;
    border: 1px solid rgba(255,255,255,0.08);
    background:
      linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)),
      rgba(255,255,255,0.02);
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  .panel::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at top right, rgba(34,211,238,0.08), transparent 30%),
      radial-gradient(circle at bottom left, rgba(124,58,237,0.08), transparent 28%);
    pointer-events: none;
  }

  .about-wrap {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 28px;
    align-items: stretch;
  }

  .about-copy,
  .about-stats {
    padding: 34px;
  }

  .about-copy h3 {
    font-family: 'Orbitron', sans-serif;
    font-size: 28px;
    margin-bottom: 18px;
  }

  .about-copy p {
    font-size: 19px;
    line-height: 1.65;
    color: var(--text-dim);
    margin-bottom: 18px;
  }

  .about-copy span {
    color: var(--cyan);
    font-weight: 700;
  }

  .about-stats-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    height: 100%;
  }

  .stat-tile {
    padding: 24px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 140px;
  }

  .stat-tile strong {
    display: block;
    font-family: 'Orbitron', sans-serif;
    font-size: 34px;
    margin-bottom: 8px;
    color: white;
  }

  .stat-tile span {
    color: var(--cyan);
    font-family: 'Orbitron', sans-serif;
    font-size: 12px;
    letter-spacing: 0.16em;
  }

  .feature-band {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 18px;
    margin-top: 28px;
  }

  .feature-box {
    padding: 22px;
    border-radius: 22px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.025);
    text-align: left;
  }

  .feature-box h4 {
    font-family: 'Orbitron', sans-serif;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .feature-box p {
    color: var(--text-dim);
    line-height: 1.55;
    font-size: 16px;
  }

  .roster-group {
    margin-top: 46px;
  }

  .roster-group:first-of-type {
    margin-top: 0;
  }

  .roster-group-title {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 22px;
    font-family: 'Orbitron', sans-serif;
    font-size: 20px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--cyan) !important;
  }

  .roster-group-title::before {
    content: "";
    width: 36px;
    height: 3px;
    background: var(--cyan);
    box-shadow: 0 0 12px var(--cyan);
    border-radius: 999px;
  }

  .roster-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 24px;
  }

  .premium-card {
    position: relative;
    border-radius: 24px;
    background: rgba(255,255,255,0.03);
    overflow: hidden;
    isolation: isolate;
    min-height: 290px;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    border: 1px solid rgba(255,255,255,0.08);
    cursor: pointer;
    transform-style: preserve-3d;
  }

  .premium-card.tilted {
    transform:
      rotateX(var(--rx, 0deg))
      rotateY(var(--ry, 0deg))
      translateY(-10px)
      scale(1.01);
  }

  .premium-card::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, rgba(34,211,238,0.7), rgba(124,58,237,0.5), rgba(34,211,238,0.7));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.55;
    animation: borderFlow 5s linear infinite;
    pointer-events: none;
  }

  .premium-card::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        260px circle at var(--mx, 50%) var(--my, 50%),
        rgba(255,255,255,0.12),
        rgba(34,211,238,0.16) 18%,
        transparent 48%
      );
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
    z-index: 0;
  }

  .premium-card:hover {
    box-shadow: 0 24px 60px rgba(0,0,0,0.45);
  }

  .premium-card:hover::after {
    opacity: 1;
  }

  .card-inner {
    position: relative;
    z-index: 2;
    padding: 28px 22px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 100%;
  }

  .card-avatar,
  .card-name,
  .card-handle,
  .card-role,
  .card-link {
    transform: translateZ(28px);
  }

  .card-avatar {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0c071d;
    border: 2px solid rgba(34,211,238,0.6);
    box-shadow: 0 0 22px rgba(34,211,238,0.16);
    margin-bottom: 16px;
    flex-shrink: 0;
  }

  .card-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .card-name {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: 'Orbitron', sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #ffffff !important;
  }

  .card-handle {
    color: #737b91;
    font-size: 15px;
    margin-bottom: 16px;
  }

  .card-role {
    color: var(--cyan);
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 18px;
  }

  .card-link {
    margin-top: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 140px;
    padding: 10px 18px;
    border-radius: 999px;
    border: 1px solid rgba(34,211,238,0.45);
    color: var(--cyan);
    font-family: 'Orbitron', sans-serif;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    transition: 0.25s ease;
    background: rgba(34,211,238,0.04);
  }

  .card-link:hover {
    background: var(--cyan);
    color: #030014;
    box-shadow: 0 0 18px rgba(34,211,238,0.35);
  }

  .marquee-wrap {
    overflow: hidden;
    border-top: 1px solid rgba(34,211,238,0.16);
    border-bottom: 1px solid rgba(34,211,238,0.16);
    background: rgba(34,211,238,0.05);
    padding: 34px 0;
  }

  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 22s linear infinite;
    white-space: nowrap;
  }

  .marquee-track span {
    flex-shrink: 0;
    padding: 0 34px;
    font-family: 'Orbitron', sans-serif;
    font-size: 40px;
    font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 1px rgba(34,211,238,0.34);
  }

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .social-cta {
    text-align: center;
    margin-top: 54px;
  }

  .social-cta h3 {
    font-family: 'Orbitron', sans-serif;
    font-size: 30px;
    margin-bottom: 14px;
  }

  .social-cta p {
    max-width: 700px;
    margin: 0 auto 24px;
    color: var(--text-dim);
    font-size: 18px;
    line-height: 1.6;
  }

  .join-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    align-items: stretch;
  }

  .join-panel,
  .join-actions {
    padding: 34px;
  }

  .join-panel h3,
  .join-actions h3 {
    font-family: 'Orbitron', sans-serif;
    font-size: 28px;
    margin-bottom: 18px;
  }

  .join-panel p,
  .join-actions p {
    color: var(--text-dim);
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 18px;
  }

  .join-list {
    list-style: none;
    display: grid;
    gap: 12px;
    margin-top: 20px;
  }

  .join-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--white-soft);
    font-size: 17px;
  }

  .join-list li::before {
    content: "";
    width: 8px;
    height: 8px;
    background: var(--cyan);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--cyan);
    flex-shrink: 0;
  }

  .contact-stack {
    display: grid;
    gap: 14px;
    margin-top: 22px;
  }

  .contact-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 20px;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    transition: 0.25s ease;
  }

  .contact-btn:hover {
    border-color: rgba(34,211,238,0.35);
    transform: translateY(-2px);
    background: rgba(34,211,238,0.05);
  }

  .contact-btn strong {
    display: block;
    font-family: 'Orbitron', sans-serif;
    font-size: 15px;
    margin-bottom: 4px;
  }

  .contact-btn span {
    color: var(--cyan);
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-family: 'Orbitron', sans-serif;
  }

  .profile-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(3,0,20,0.8);
    backdrop-filter: blur(12px);
    display: none;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 1300;
    opacity: 0;
    transition: 0.25s ease;
  }

  .profile-modal-overlay.open {
    display: flex;
    opacity: 1;
  }

  .profile-modal-box {
    width: min(980px, 100%);
    border-radius: 30px;
    border: 1px solid rgba(255,255,255,0.08);
    background:
      linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)),
      rgba(8,4,28,0.96);
    box-shadow: 0 24px 80px rgba(0,0,0,0.48);
    position: relative;
    overflow: hidden;
  }

  .profile-modal-box::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at top right, rgba(34,211,238,0.12), transparent 30%),
      radial-gradient(circle at bottom left, rgba(124,58,237,0.1), transparent 30%);
    pointer-events: none;
  }

  .profile-layout {
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 0;
    position: relative;
    z-index: 2;
  }

  .profile-left {
    padding: 34px;
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 420px;
  }

  .profile-right {
    padding: 40px 34px;
  }

  .profile-avatar {
    width: 220px;
    height: 220px;
    border-radius: 28px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.03);
    border: 2px solid rgba(34,211,238,0.35);
    box-shadow: 0 0 30px rgba(34,211,238,0.12);
  }

  .profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-role {
    color: #22d3ee;
    font-family: 'Orbitron', sans-serif;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .profile-name {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(28px, 4vw, 42px);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    color: #ffffff !important;
  }

  .profile-handle {
    color: #7e879e;
    font-size: 18px;
    margin-bottom: 22px;
  }

  .profile-bio {
    color: #a0a8bc;
    font-size: 18px;
    line-height: 1.65;
    margin-bottom: 28px;
  }

  .profile-stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 26px;
  }

  .profile-stat {
    padding: 18px;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
  }

  .profile-stat strong {
    display: block;
    font-family: 'Orbitron', sans-serif;
    font-size: 24px;
    margin-bottom: 8px;
  }

  .profile-stat span {
    color: #8f98ae;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .profile-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .profile-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    color: white;
    cursor: pointer;
    z-index: 4;
    transition: 0.2s ease;
  }

  .profile-close:hover {
    color: #22d3ee;
    border-color: rgba(34,211,238,0.45);
  }

  footer {
    padding: 50px 0 70px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .footer-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }

  .footer-brand {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .footer-brand img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    object-fit: cover;
    opacity: 0.8;
    border: 1px solid rgba(34,211,238,0.18);
  }

  .footer-brand strong {
    display: block;
    font-family: 'Orbitron', sans-serif;
    font-size: 16px;
    color: #ffffff;
  }

  .footer-brand span,
  .footer-copy {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
  }

  .footer-links {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .footer-links a {
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    color: #7f88a2;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .footer-links a:hover {
    color: var(--cyan);
  }

  @media (max-width: 1040px) {
    .hero-layout,
    .about-wrap,
    .join-wrap {
      grid-template-columns: 1fr;
    }

    .feature-band {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .hero-visual {
      min-height: 480px;
    }
  }

  @media (max-width: 900px) {
    .profile-layout {
      grid-template-columns: 1fr;
    }

    .profile-left {
      border-right: none;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      min-height: 280px;
    }

    .profile-avatar {
      width: 180px;
      height: 180px;
    }

    .profile-stats {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }

    .hamburger {
      display: block;
    }

    .hero-actions {
      flex-direction: column;
      align-items: stretch;
    }

    .btn-primary,
    .btn-secondary {
      width: 100%;
    }

    .hero-stats,
    .about-stats-grid,
    .feature-band,
    .roster-grid {
      grid-template-columns: 1fr;
    }

    .about-copy,
    .about-stats,
    .join-panel,
    .join-actions,
    .profile-right,
    .profile-left {
      padding: 24px;
    }

    .hero-title {
      font-size: clamp(48px, 14vw, 76px);
    }

    .marquee-track span {
      font-size: 30px;
    }

    .section-head h2 {
      font-size: 32px;
    }
  }
`;
