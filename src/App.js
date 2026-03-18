import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  Trophy,
  Video,
  TrendingUp,
  Crown,
  Shield,
  MessageSquare,
  User,
  ExternalLink,
  Menu,
  X,
  Gamepad2,
  Twitch,
  Radio,
} from "lucide-react";

// --- Data ---
const ROSTER = {
  owners: [
    {
      name: "Phe",
      handle: "@lolitsphe",
      link: "https://tiktok.com/@lolitsphe",
      twitch: "lolitsphe",
      isLive: false,
      livePlatform: "twitch",
    },
    {
      name: "Gia",
      handle: "@starlitgiaxo",
      link: "https://tiktok.com/@starlitgiaxo",
    },
  ],
  moderators: [
    {
      name: "Awoken",
      handle: "@awoken1738",
      link: "https://tiktok.com/@awoken1738",
    },
    {
      name: "Rose",
      handle: "@xsvrosettv",
      link: "https://tiktok.com/@xsvrosettv",
      twitch: "xsvrosettv",
      isLive: false,
      livePlatform: "twitch",
    },
  ],
  discordMod: [
    {
      name: "Bailey",
      handle: "@v2baileyy",
      link: "https://tiktok.com/@v2baileyy",
    },
  ],
  members: [
    {
      name: "Sophia",
      handle: "@shywallflower14",
      link: "https://tiktok.com/@shywallflower14",
    },
    {
      name: "Bootz",
      handle: "@b00tzinaction",
      link: "https://tiktok.com/@b00tzinaction",
      isLive: false,
      livePlatform: "tiktok",
    },
    { name: "Star", handle: "@star_e25", link: "https://tiktok.com/@star_e25" },
    {
      name: "Kian",
      handle: "@ttvphantom7x",
      link: "https://tiktok.com/@ttvphantom7x",
    },
    {
      name: "Twisttz",
      handle: "@iamtwisttz",
      link: "https://tiktok.com/@iamtwisttz",
    },
    {
      name: "Angel",
      handle: "@luvgojocream",
      link: "https://www.tiktok.com/@luvgojocream",
    },
    {
      name: "Marz",
      handle: "@ifearurfate",
      link: "https://tiktok.com/@ifearurfate",
    },
    {
      name: "r1jasmine",
      handle: "@r1jasmine",
      link: "https://www.tiktok.com/@r1jasmine?lang=en",
    },
    {
      name: "zb.jsn",
      handle: "@zb.jsn",
      link: "https://www.tiktok.com/@zb.jsn?lang=en",
    },
    {
      name: "Cupid",
      handle: "@cupidfn_",
      link: "https://www.tiktok.com/@cupidfn_",
    },
    {
      name: "Cherry",
      handle: "@ttvcherryxo",
      link: "https://www.tiktok.com/@ttvcherryxo",
    },
    {
      name: "Sippin",
      handle: "@isippin",
      link: "https://www.tiktok.com/@isippin",
    },
    {
      name: "Arlyn",
      handle: "@xo_arlynn",
      link: "https://www.tiktok.com/@xo_arlynn",
    },
  ],
};

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_neon-luxx/artifacts/2jnpaax9_C01A0F60-D3B1-4666-99D2-A8CCDDFE1BB8.webp";

// --- Components ---

const BrandShowcase = () => (
  <div className="relative w-full max-w-[550px] mx-auto aspect-square bg-[#0c0714]/40 rounded-[2.5rem] md:rounded-[3rem] border border-[#22D3EE]/10 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]">
    {/* Grid Background */}
    <div className="absolute inset-0 bg-grid opacity-30" />

    {/* Center Logo */}
    <div
      className="relative z-10 w-[45%] h-[45%] rounded-full overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.2)] ring-1 ring-[#22D3EE]/20 flex-shrink-0 animate-floating-badge"
      style={{ animationDuration: "8s" }}
    >
      <img
        src={LOGO_URL}
        alt="Luxx"
        className="w-full h-full object-cover scale-[1.05]"
      />
    </div>

    {/* Badge 1: Premium */}
    <div
      className="absolute top-[12%] left-[4%] bg-[#070514]/95 border border-white/10 px-3 py-2 md:px-5 md:py-3 rounded-xl z-20 shadow-2xl backdrop-blur-md animate-floating-badge"
      style={{ animationDelay: "0.5s" }}
    >
      <div className="font-orbitron font-black text-white text-[10px] md:text-lg mb-0.5 drop-shadow-md leading-none">
        PREMIUM
      </div>
      <div className="font-orbitron text-white/50 text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-bold">
        BRAND IDENTITY
      </div>
    </div>

    {/* Badge 2: Roster */}
    <div
      className="absolute top-[28%] right-[4%] bg-[#070514]/95 border border-white/10 px-3 py-2 md:px-5 md:py-3 rounded-xl z-20 shadow-2xl backdrop-blur-md animate-floating-badge"
      style={{ animationDelay: "1.2s" }}
    >
      <div className="font-orbitron font-black text-white text-[10px] md:text-lg mb-0.5 drop-shadow-md leading-none">
        ROSTER
      </div>
      <div className="font-orbitron text-white/50 text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-bold">
        PLAYERS & CREATORS
      </div>
    </div>

    {/* Badge 3: Luxx */}
    <div
      className="absolute bottom-[25%] right-[6%] bg-[#070514]/95 border border-white/10 px-3 py-2 md:px-5 md:py-3 rounded-xl z-20 shadow-2xl backdrop-blur-md animate-floating-badge"
      style={{ animationDelay: "0.8s" }}
    >
      <div className="font-orbitron font-black text-white text-[10px] md:text-lg mb-0.5 drop-shadow-md leading-none">
        LUXX
      </div>
      <div className="font-orbitron text-white/50 text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-bold">
        SHINE DIFFERENT
      </div>
    </div>

    {/* Badge 4: Community */}
    <div
      className="absolute bottom-[12%] left-[6%] bg-[#070514]/95 border border-white/10 px-3 py-2 md:px-5 md:py-3 rounded-xl z-20 shadow-2xl backdrop-blur-md animate-floating-badge"
      style={{ animationDelay: "1.5s" }}
    >
      <div className="font-orbitron font-black text-white text-[10px] md:text-lg mb-0.5 drop-shadow-md leading-none">
        COMMUNITY
      </div>
      <div className="font-orbitron text-white/50 text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-bold">
        BUILT TO GROW
      </div>
    </div>
  </div>
);

const ScanLines = () => (
  <div
    className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
    style={{
      background:
        "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
      backgroundSize: "100% 4px, 3px 100%",
    }}
  />
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-12 text-center">
    <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-white tracking-wider mb-4">
      {title}
      <div className="h-1 w-24 bg-[#22D3EE] mx-auto mt-2 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
    </h2>
    {subtitle && (
      <p className="text-[#22D3EE] font-rajdhani uppercase tracking-[0.2em]">
        {subtitle}
      </p>
    )}
  </div>
);

const RosterCard = ({ member, role, isOwner }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative bg-[#070514] border border-white/5 p-6 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[#22D3EE]/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full bg-[#0c0714] border-2 border-[#123842] flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.05)] group-hover:border-[#22D3EE] transition-colors">
            {member.image && !imgError ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <User className="w-10 h-10 text-white/20 group-hover:text-[#22D3EE] transition-colors" />
            )}
          </div>
          {isOwner && (
            <div className="absolute -top-2 -right-2 bg-[#22D3EE] p-1.5 rounded-full shadow-[0_0_10px_#22D3EE]">
              <Crown className="w-4 h-4 text-[#030014]" fill="currentColor" />
            </div>
          )}
        </div>

        <h3 className="text-xl font-orbitron text-white mb-1">{member.name}</h3>
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] text-xs font-bold uppercase tracking-wider mb-4 border border-[#22D3EE]/20">
          {role === "owner" && <Crown className="w-3 h-3" />}
          {role === "moderator" && <Shield className="w-3 h-3" />}
          {role === "discord" && <MessageSquare className="w-3 h-3" />}
          {role === "member" && <Users className="w-3 h-3" />}
          {role === "discord" ? "Discord Mod" : role}
        </span>

        <p className="text-[#686a7a] font-rajdhani mb-4">{member.handle}</p>

        {member.link ? (
          <a
            href={member.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#0c0714] border border-[#2a2438] text-[#22D3EE] font-rajdhani font-bold rounded hover:bg-[#22D3EE] hover:text-[#030014] transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
          >
            TIKTOK <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <div className="h-10" />
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamically count all members across all roles
  const totalMembers = Object.values(ROSTER).reduce(
    (total, group) => total + group.length,
    0
  );

  // Memoize particles so random positions don't regenerate on every render
  const particles = useMemo(
    () =>
      [...Array(20)].map((_, i) => ({
        id: i,
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5,
      })),
    []
  );

  // Memoize liveMembers so it's not recomputed on every render
  const liveMembers = useMemo(
    () =>
      [
        ...ROSTER.owners.map((m) => ({ ...m, role: "owner" })),
        ...ROSTER.moderators.map((m) => ({ ...m, role: "moderator" })),
        ...ROSTER.discordMod.map((m) => ({ ...m, role: "discord" })),
        ...ROSTER.members.map((m) => ({ ...m, role: "member" })),
      ].filter((m) => m.isLive),
    []
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white font-rajdhani selection:bg-[#22D3EE] selection:text-[#030014]">
      <ScanLines />

      {/* --- Styles --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }

        .bg-grid {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        }

        @keyframes glitch {
          0% { text-shadow: 2px 2px #22D3EE, -2px -2px #ff00c1; transform: translate(0); }
          20% { text-shadow: -2px 2px #22D3EE, 2px -2px #ff00c1; transform: translate(-2px, 2px); }
          40% { text-shadow: 2px -2px #22D3EE, -2px 2px #ff00c1; transform: translate(2px, -2px); }
          60% { text-shadow: -2px -2px #22D3EE, 2px 2px #ff00c1; transform: translate(-2px, -2px); }
          80% { text-shadow: 2px 2px #22D3EE, -2px -2px #ff00c1; transform: translate(2px, 2px); }
          100% { text-shadow: 2px 2px #22D3EE, -2px -2px #ff00c1; transform: translate(0); }
        }

        .glitch-text {
          animation: glitch 1s infinite linear alternate-reverse;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.5; }
          100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
        }

        .particle {
          position: absolute;
          background: #22D3EE;
          border-radius: 50%;
          pointer-events: none;
          animation: float 5s infinite ease-in-out;
        }

        .glass-panel {
          background: rgba(7, 5, 20, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(26, 28, 41, 1);
        }

        /* Floating Badge Animation */
        @keyframes floating-badge {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .animate-floating-badge {
          animation: floating-badge 6s infinite ease-in-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .mobile-menu-enter {
          animation: slideDown 0.25s ease forwards;
        }
      `}</style>

      {/* --- Navbar --- */}
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-[#030014]/90 backdrop-blur-md py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-[#22D3EE]/20"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            <img
              src={LOGO_URL}
              alt="Logo"
              className="w-10 h-10 rounded-full overflow-hidden object-cover border border-[#22D3EE]/30 drop-shadow-[0_0_8px_#22D3EE]"
            />
            <span className="font-orbitron font-black text-xl tracking-tighter text-white">
              TEAM <span className="text-[#22D3EE]">LUXX</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "About", "Roster", "Socials", "Join"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="font-orbitron text-xs font-bold uppercase tracking-[0.2em] text-white/70 hover:text-[#22D3EE] transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#22D3EE] transition-all group-hover:w-full shadow-[0_0_10px_#22D3EE]" />
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-enter md:hidden absolute top-full left-0 w-full bg-[#030014] border-b border-[#22D3EE]/20 py-8 flex flex-col items-center gap-6">
            {["Home", "About", "Roster", "Socials", "Join"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="font-orbitron text-lg font-bold uppercase tracking-widest text-white hover:text-[#22D3EE]"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <header
        id="home"
        className="relative min-h-screen flex items-center justify-center text-center lg:text-left px-6 pt-28 pb-12 overflow-hidden"
      >
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid pointer-events-none" />

        {/* Use memoized particle data so positions are stable across renders */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: p.width + "px",
              height: p.height + "px",
              left: p.left + "%",
              top: p.top + "%",
              animationDelay: p.delay + "s",
              opacity: p.opacity,
            }}
          />
        ))}

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start">
            <p className="font-orbitron font-bold text-[#22D3EE] tracking-[0.25em] text-xs md:text-sm uppercase mb-4 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
              Elite Gaming Organization
            </p>

            <h1 className="font-orbitron text-6xl sm:text-7xl lg:text-[100px] font-black leading-[0.85] tracking-tight mb-8">
              <span className="block text-white">TEAM</span>
              <span className="block text-[#22D3EE]">LUXX</span>
            </h1>

            <p className="font-rajdhani text-lg md:text-[19px] text-[#8b92a5] mb-10 max-w-xl leading-relaxed">
              Dominating the competition. Building legends. Welcome to the next
              generation of esports excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <button
                onClick={() => scrollTo("roster")}
                className="px-10 py-4 bg-[#22D3EE] text-[#030014] font-orbitron font-black text-[13px] uppercase tracking-widest rounded-sm transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-105"
              >
                View Roster
              </button>
              <button
                onClick={() => scrollTo("join")}
                className="px-10 py-4 bg-[#070514]/70 border border-[#22D3EE]/30 text-[#22D3EE] font-orbitron font-black text-[13px] uppercase tracking-widest rounded-sm transition-all hover:bg-[#22D3EE]/10 hover:border-[#22D3EE]"
              >
                Join Team
              </button>
            </div>
          </div>

          {/* Right Brand Showcase */}
          <div className="flex-1 w-full max-w-[500px] lg:max-w-none">
            <BrandShowcase />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-[#22D3EE] to-transparent" />
        </div>
      </header>

      {/* --- About Section --- */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeader
            title="About Team Luxx"
            subtitle="The Light in the Dark"
          />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light">
              <p className="border-l-4 border-[#22D3EE] pl-6 bg-white/5 py-4 rounded-r-lg">
                Team Luxx is more than just an esports team — we're a community
                of passionate gamers and content creators pushing boundaries in
                the competitive gaming scene.
              </p>
              <p>
                The name <span className="text-[#22D3EE] font-bold">Luxx</span>{" "}
                means being the light in the dark. That's what we stand for —
                shining through every challenge, every match, and every moment.
                No matter how tough it gets, Team Luxx lights the way.
              </p>
              <p>
                Founded by dedicated players who believe in teamwork, skill, and
                entertainment, we bring together the best talent from across the
                gaming community.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "MEMBERS",
                  value: `${totalMembers}+`,
                  icon: <Users size={32} />,
                },
                {
                  label: "VICTORIES",
                  value: "100+",
                  icon: <Trophy size={32} />,
                },
                { label: "CONTENT", value: "500+", icon: <Video size={32} /> },
                {
                  label: "GROWTH",
                  value: "24/7",
                  icon: <TrendingUp size={32} />,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass-panel py-10 px-6 rounded-2xl text-center flex flex-col items-center hover:border-[#22D3EE]/50 transition-colors group"
                >
                  <div className="text-[#22D3EE] mb-4 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-[40px] font-orbitron font-bold text-white leading-none mb-3">
                    {stat.value}
                  </div>
                  <div className="text-[#686a7a] font-rajdhani font-bold uppercase text-sm tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Live Now Section --- */}
      {liveMembers.length > 0 && (
        <section
          id="live"
          className="py-12 bg-black/50 border-y border-[#ff004c]/30"
        >
          <div className="container mx-auto px-6">
            <div className="flex items-start gap-5 mb-10">
              <div className="w-[52px] h-[52px] border border-[#ff004c]/50 flex-shrink-0 flex items-center justify-center bg-[#ff004c]/10 rounded animate-pulse">
                <Radio className="text-[#ff004c] w-7 h-7" />
              </div>
              <div className="flex flex-col flex-1 pt-0.5">
                <div className="flex items-center w-full">
                  <h3 className="text-[28px] font-orbitron text-white font-black tracking-wide leading-none mr-6 flex items-center gap-3">
                    LIVE NOW
                    <span className="w-3 h-3 bg-[#ff004c] rounded-full animate-ping"></span>
                  </h3>
                  <div className="flex-1 h-[1px] bg-[#1a1c29]"></div>
                </div>
                <span className="text-[#5c6479] font-rajdhani text-[15px] mt-1.5">
                  Members currently streaming
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {liveMembers.map((member, i) => (
                <div
                  key={i}
                  className="bg-[#070514] border border-[#ff004c]/50 p-6 rounded-xl hover:-translate-y-2 transition-transform shadow-[0_0_20px_rgba(255,0,76,0.15)] relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff004c] to-transparent" />

                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-[#0c0714] border-2 border-[#ff004c] flex items-center justify-center overflow-hidden">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="text-white/20 w-8 h-8" />
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-[#ff004c] text-white text-[9px] font-bold px-1.5 py-0.5 rounded font-orbitron">
                        LIVE
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-orbitron font-bold text-white text-lg leading-none mb-1">
                        {member.name}
                      </h4>
                      <p className="text-[#5c6479] font-rajdhani text-sm uppercase tracking-wider">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {member.livePlatform === "tiktok" ? (
                    <a
                      href={`${member.link}/live`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-[#22D3EE] hover:bg-[#1bb8d1] text-[#030014] font-rajdhani font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                    >
                      <Video className="w-5 h-5" />
                      WATCH TIKTOK
                    </a>
                  ) : (
                    <a
                      href={`https://www.twitch.tv/${member.twitch}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-[#9146FF] hover:bg-[#a970ff] text-white font-rajdhani font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(145,70,255,0.4)]"
                    >
                      <Twitch className="w-5 h-5" />
                      WATCH TWITCH
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- Roster Section --- */}
      <section id="roster" className="py-24 bg-black/30">
        <div className="container mx-auto px-6">
          <SectionHeader title="Our Roster" subtitle="The Elites" />

          {/* Owners */}
          <div className="mb-16">
            <h3 className="text-2xl font-orbitron text-white mb-8 flex items-center gap-3">
              <Crown className="text-[#22D3EE]" /> OWNERS
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ROSTER.owners.map((m, i) => (
                <RosterCard key={i} member={m} role="owner" isOwner />
              ))}
            </div>
          </div>

          {/* Management / Staff */}
          <div className="mb-16">
            <h3 className="text-2xl font-orbitron text-white mb-8 flex items-center gap-3">
              <Shield className="text-[#22D3EE]" /> STAFF & MODERATORS
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ROSTER.moderators.map((m, i) => (
                <RosterCard key={i} member={m} role="moderator" />
              ))}
              {ROSTER.discordMod.map((m, i) => (
                <RosterCard key={i} member={m} role="discord" />
              ))}
            </div>
          </div>

          {/* Members Header */}
          <div>
            <div className="flex items-start gap-5 mb-10">
              <div className="w-[52px] h-[52px] border border-[#123842] flex-shrink-0 flex items-center justify-center bg-transparent">
                <Gamepad2 className="text-[#22D3EE] w-7 h-7" />
              </div>
              <div className="flex flex-col flex-1 pt-0.5">
                <div className="flex items-center w-full">
                  <h3 className="text-[28px] font-orbitron text-white font-black tracking-wide leading-none mr-6">
                    MEMBERS
                  </h3>
                  <div className="flex-1 h-[1px] bg-[#1a1c29]"></div>
                </div>
                <span className="text-[#5c6479] font-rajdhani text-[15px] mt-1.5">
                  The Squad
                </span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ROSTER.members.map((m, i) => (
                <RosterCard key={i} member={m} role="member" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Socials Section --- */}
      <section
        id="socials"
        className="py-24 relative overflow-hidden bg-[#22D3EE]"
      >
        <div className="absolute inset-0 bg-[#030014] opacity-[0.97]" />

        <div className="relative z-10">
          <div className="container mx-auto px-6 text-center mb-16">
            <SectionHeader title="Follow Us" subtitle="Stay Connected" />
            <a
              href="https://tiktok.com/@luxxesports"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-10 py-5 bg-[#22D3EE] text-[#030014] font-orbitron font-black text-xl rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
            >
              TIKTOK @LUXXESPORTS
            </a>
          </div>

          {/* Marquee */}
          <div className="relative py-8 bg-[#22D3EE]/5 border-y border-[#22D3EE]/20 overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-12 px-6">
                  {[
                    "TEAM LUXX",
                    "ESPORTS",
                    "GAMING",
                    "CONTENT",
                    "COMMUNITY",
                    "COMPETE",
                    "CREATE",
                    "DOMINATE",
                  ].map((text, idx) => (
                    <span
                      key={idx}
                      className="text-4xl md:text-6xl font-orbitron font-black text-transparent stroke-cyan-500"
                      style={{
                        WebkitTextStroke: "1px rgba(34, 211, 238, 0.4)",
                      }}
                    >
                      {text}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Join Section --- */}
      <section id="join" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="glass-panel p-10 md:p-16 rounded-[2rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <img src={LOGO_URL} alt="bg" className="w-64 h-64 rotate-12" />
            </div>

            <div className="relative z-10">
              <div className="mb-10">
                <span className="px-4 py-1 bg-[#22D3EE]/20 text-[#22D3EE] rounded-full text-xs font-bold font-orbitron tracking-widest uppercase mb-4 inline-block border border-[#22D3EE]/30">
                  Recruitment Open
                </span>
                <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-6">
                  JOIN TEAM LUXX
                </h2>
                <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
                  Think you have what it takes? Reach out to one of our owners
                  on TikTok to start your journey with the light.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="flex flex-col gap-5">
                  <a
                    href="https://tiktok.com/@lolitsphe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-5 bg-[#0c0714] border border-[#2a2438] rounded-2xl hover:border-[#22D3EE]/50 hover:bg-[#141022] transition-all group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-[52px] h-[52px] rounded-full bg-[#14293a] flex items-center justify-center">
                        <MessageSquare className="text-[#22D3EE] w-[22px] h-[22px]" />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-white font-orbitron font-black text-[22px] leading-none mb-1.5">
                          DM Phe
                        </div>
                        <div className="text-[#686a7a] font-rajdhani text-[15px] leading-none">
                          Owner
                        </div>
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://tiktok.com/@starlitgiaxo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-5 bg-[#0c0714] border border-[#2a2438] rounded-2xl hover:border-[#22D3EE]/50 hover:bg-[#141022] transition-all group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-[52px] h-[52px] rounded-full bg-[#14293a] flex items-center justify-center">
                        <MessageSquare className="text-[#22D3EE] w-[22px] h-[22px]" />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-white font-orbitron font-black text-[22px] leading-none mb-1.5">
                          DM Gia
                        </div>
                        <div className="text-[#686a7a] font-rajdhani text-[15px] leading-none">
                          Owner
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="bg-[#0c0714] border border-[#2a2438] p-8 rounded-2xl">
                  <h4 className="text-[#22D3EE] font-orbitron font-bold mb-6 text-lg tracking-wider">
                    WHAT WE LOOK FOR
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "Active on TikTok with gaming content",
                      "Positive attitude and team mentality",
                      "Consistent content creation",
                      "Passion for competitive gaming",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-white/80"
                      >
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 border-t border-white/5 relative bg-[#030014]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="Logo"
              className="w-10 h-10 rounded-full overflow-hidden object-cover border border-[#22D3EE]/30"
            />
            <div className="font-orbitron font-black text-lg tracking-tighter">
              TEAM <span className="text-[#22D3EE]">LUXX</span>
              <div className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-rajdhani -mt-1">
                Esports Excellence
              </div>
            </div>
          </div>

          <div className="text-white/40 text-sm font-rajdhani">
            © {new Date().getFullYear()} Team Luxx Esports. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://tiktok.com/@luxxesports"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Team Luxx on TikTok"
              className="w-10 h-10 rounded-full bg-[#0c0714] border border-[#2a2438] flex items-center justify-center text-white hover:bg-[#22D3EE] hover:text-[#030014] hover:border-[#22D3EE] transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            >
              <Video className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
