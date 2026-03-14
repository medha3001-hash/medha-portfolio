"use client";

import { useState, useEffect, useRef } from "react";
import { User, Terminal as TerminalIcon, LayoutGrid, LogOut, Wifi, Battery, Smile, X, Timer } from "lucide-react";

// --- MATRIX RAIN BACKGROUND ---
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const characters = "01"; 
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 255, 65, 0.25)"; 
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
}

// --- BOOT SEQUENCE LOGS ---
const bootLogsData = [
  "[ OK ] Started System Logging Service.",
  "[ OK ] Reached target System Initialization.",
  "[ OK ] Listening on D-Bus System Message Bus Socket.",
  "[ OK ] Reached target Basic System.",
  "[ ** ] Mounting Virtual File System...",
  "[ OK ] Starting Cryptography Setup for User Disk...",
  "[ ** ] Decrypting Root Volume...",
  "[ OK ] Root Volume Decrypted Successfully.",
  "[ OK ] Starting Network Manager...",
  "[ ** ] Initializing Matrix Protocol v2.4...",
  "[ OK ] Loading Medha's Portfolio Modules...",
  "[ OK ] Injecting Glassmorphism Shaders...",
  "Starting User Session...",
  "Access Granted. Welcome, ROOT."
];

// --- THE OFFICE MEMES (GIFs & Static Images) ---
const officeMemes = [
  "https://media.giphy.com/media/1T96TRBBGYThC/giphy.gif", // Michael Scott "No"
  "/The Office tv show.jpeg",                       // Pam "They're the same picture"
  "/_ (3).jpeg", // Jim staring through blinds
  "/_ (4).jpeg",                       // Prison Mike
  "/_ (5).jpeg", // Parkour
  "_ (6).jpeg",                       // Michael "Ready to get hurt again"
  "https://media.giphy.com/media/dXFKDUolyLLi8gq6Cl/giphy.gif", // Dwight "True"
  "/- Michael Scott.jpeg",                        // Kelly "First of all, how dare you"
  "/boom_ roasted.jpeg",
  "/Michael Scott is fav.jpeg",
  "/The almighty Dwight Kurt SCHRUTE!!!!!!!!!.jpeg"
];
const AVAILABLE_COMMANDS = ['help', 'about', 'internships', 'projects', 'education', 'achievements', 'leadership', 'activities', 'contact', 'clear'];

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [time, setTime] = useState("");
  const [sessionSeconds, setSessionSeconds] = useState(0);
  
  const [activeWindow, setActiveWindow] = useState<'terminal' | 'memes'>('terminal');

  // Terminal States
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  const [terminalFullScreen, setTerminalFullScreen] = useState(false);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<{ type: string; text: string | React.ReactNode }[]>([
  { type: "output", text: "Welcome to Medha's portfolio!" }
]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Meme App States
  const [memesOpen, setMemesOpen] = useState(false);
  const [memesMinimized, setMemesMinimized] = useState(false);
  const [memesFullScreen, setMemesFullScreen] = useState(false);

  // Break Popup States
  const [showBreakPopup, setShowBreakPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  // Clock
  useEffect(() => {
    const updateClock = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    updateClock();
    const clockTimer = setInterval(updateClock, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  // Session Timer
  useEffect(() => {
    let sessionInterval: NodeJS.Timeout;
    if (isLogged && !isBooting) {
      sessionInterval = setInterval(() => setSessionSeconds(prev => prev + 1), 1000);
    }
    return () => clearInterval(sessionInterval);
  }, [isLogged, isBooting]);

  const formatSessionTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // One-Time Popup Logic (45 seconds)
  useEffect(() => {
    if (!isLogged || isBooting || hasShownPopup) return;
    const breakTimer = setTimeout(() => {
      setShowBreakPopup(true);
      setHasShownPopup(true);
    }, 60000); 
    return () => clearTimeout(breakTimer);
  }, [isLogged, isBooting, hasShownPopup]);

  const handleLogin = () => {
    if (isBooting || isLogged) return; 
    setIsLogged(true); setIsBooting(true); setVisibleLogs([]); setSessionSeconds(0);
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < bootLogsData.length) {
        setVisibleLogs(prev => [...prev, bootLogsData[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => setIsBooting(false), 400); 
      }
    }, 45); 
  };

  const openApp = (app: 'terminal' | 'memes') => {
    if (app === 'terminal') {
      setTerminalOpen(true); setTerminalMinimized(false); setActiveWindow('terminal');
    } else if (app === 'memes') {
      setMemesOpen(true); setMemesMinimized(false); setActiveWindow('memes'); setShowBreakPopup(false); 
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (!command) return;
      const match = AVAILABLE_COMMANDS.find(cmd => cmd.startsWith(command.toLowerCase()));
      if (match) setCommand(match);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setCommand(commandHistory[commandHistory.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setCommand(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1); setCommand("");
      }
    }
  };

  const runCommand = (cmdStr: string) => {
    const cleanCmd = cmdStr.toLowerCase().trim();
    if (!cleanCmd) return;
    let output: string | React.ReactNode = "";
    
    switch(cleanCmd) {
      case 'help':
        output = `Available commands:
  • about         - About me and my skills
  • internships   - Internship experience
  • projects      - My projects
  • education     - Educational background
  • achievements  - Competitions and certifications
  • leadership    - My positions and responsibilities
  • activities    - Extra-curricular activities
  • contact       - Contact information
  • clear         - Clear the terminal screen`;
        break;
      case 'about':
        output = `👤 ABOUT ME\n════════════════════════════════════════════════════\nI’m a B.Tech IT student at Guru Gobind Singh Indraprastha University with interests in AI, data analytics, and software development. I have worked as a Data Analyst Intern at ARJ Securities, using Python and SQL to analyze market data, and I’m currently an AI/ML Research Intern at IIT Roorkee, working on machine learning and Digital Twin systems.

I enjoy building practical tech solutions using Python, SQL, and web technologies, and my research on an AI-based diet planner (BiteBot) has been published in an international journal.\n\n[ CORE SKILLS ]\n• Languages: Python, SQL\n• Technologies: Next.js, React, Node.js, PostgreSQL, IBM Cloud Pak\n• Specializations: Data Analytics, AI/ML Applications, Database Management`;
        break;
      case 'internships':
        output = `💼 INTERNSHIP EXPERIENCE\n════════════════════════════════════════════════════\n\n2026 (Mar) — Present\n├─ 🟢 Research Intern (AI/ML) @ IIT Roorkee\n│  ├─ Contributing to the design of Digital Twin simulations for real-time monitoring.\n│  └─ Implementing advanced machine learning frameworks to optimize operational\n│     efficiency within the global power and energy sector.\n│\n2025 (Jul — Oct)\n└─ 🔵 Data Analyst Intern @ ARJ Securities\n   ├─ Developed Python/Pandas scripts to analyze market volatility and P/E trends.\n   ├─ Engineered complex SQL queries (Joins, CTEs) to aggregate consumer behavior data.\n   └─ Built data pipelines and Matplotlib visualizations for weekly investment briefs.`;
        break;
      case 'projects':
        output = `📂 PROJECTS DIRECTORY\n════════════════════════════════════════════════════\n\n[ SYSTEM NOTE: Directory currently under heavy compilation. ]\n[ Check back soon for BiteBot and Safe Max deployments.     ]`;
        break;
      case 'education':
        output = `🎓 EDUCATIONAL BACKGROUND\n════════════════════════════════════════════════════\n\n2022 — 2026\n├─ 🟢 B.Tech in Information Technology\n│  ├─ Guru Gobind Singh Indraprastha University (GGSIPU), New Delhi\n│  └─ Status: Pursuing\n│\n2022\n├─ 🔵 Class XII (CBSE)\n│  ├─ Bharti Public School, Mayur Vihar\n│  └─ Score: 84%\n│\n2020\n└─ 🔵 Class X (CBSE)\n   ├─ Bharti Public School, Mayur Vihar\n   └─ Score: 87%`;
        break;
      case 'achievements':
        output = `🏆 COMPETITIONS & CERTIFICATIONS\n════════════════════════════════════════════════════\n\n┌ 🏅 Academic Excellence ───────────────────────────────┐\n│ • Published research paper "BiteBot: An AI-Diet     │\n│   Planner" in IJSREM (Nov 2025).                    │\n│ • Awarded "Best Project in SQL" out of 80 students  │\n│   for a School Management System.                   │\n│ • Received Certificates of Merit for Computer       │\n│   Science (Python, SQL) & English.                  │\n└───────────────────────────────────────────────────────┘\n\n┌ 📜 Certifications & Hackathons ───────────────────────┐\n│ • IBM Web Dev: Built e-commerce sites (July 2024)   │\n│ • IBM Cloud Pak: Liberty Developer Essentials       │\n│ • Selected for prestigious Inter-School Hackathon   │\n│ • 1st Place (out of 5,000): Meme Marketing, IIM Trichy     │\n└───────────────────────────────────────────────────────┘`;
        break;
      case 'leadership':
        output = `👑 POSITIONS OF RESPONSIBILITY\n════════════════════════════════════════════════════\n\n• Head of Revenue @ Hoof-IT (2023-24)\n  Secured ₹80,000 in revenue through strategic marketing and partnerships.\n\n• Head Choreographer & Core Member @ Western Dance Society (2022-23)\n  Organized 24 competitions engaging 15,000+ participants. Managed social \n  media (100+ posts) and led volunteer logistics.\n\n• Event Organizer @ Utkarsh (2024)\n  Organized GGSIPU annual cultural events for 200+ attendees, coordinating \n  performances and managing ₹200,000 in sponsorships.`;
        break;
      case 'activities':
        output = `⚽ EXTRA-CURRICULAR ACTIVITIES\n════════════════════════════════════════════════════\n\n• Sports: \n  - Vice Captain of the College Football Team (2025).\n  - Won Bronze (100m sprint) & Silver (4x200m relay) at East Delhi Zonals.\n  - Semi-Finalist in Basketball at East Delhi Zonals (2018).\n\n• Hobbies:\n  - Trained Bharatanatyam dancer (3-year diploma from Kurukshetra University).\n  - Passionate about both classical and western dance.`;
        break;
      case 'contact':
        output = (
        <div className="flex flex-col">
          <span>📬 CONTACT INFORMATION</span>
          <span>=================================================================================</span>
          <br />
          <span>• Email:    medha3001@gmail.com</span>
          <span>• Phone:    +91 7011976179</span>
          <span>• Location: GGSIPU, New Delhi</span>
          <span>
            • LinkedIn: <a href="https://www.linkedin.com/in/medha-bhardwaj-137671180" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">linkedin.com/in/medha-bhardwaj</a>
          </span>
          <span>
            • GitHub:   <a href="https://github.com/medha3001-hash" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/medha3001-hash</a>
          </span>
        </div>
      );
      break;
      case 'clear': 
        setHistory([]); setCommand(""); return;
      default: 
        output = `zsh: command not found: ${cleanCmd}`;
    }
    setHistory(prev => [...prev, { type: "input", text: `root@medha portfolio % ${cleanCmd}` }, { type: "output", text: output }]);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = command.trim();
    if (cleanCmd) setCommandHistory(prev => [...prev, cleanCmd]);
    setHistoryIndex(-1);
    runCommand(command);
    setCommand("");
  };

  if (!isLogged) {
    return (
      <main style={{ height: "100vh", backgroundColor: "black", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <MatrixRain />
        
        {/* LOGIN SCREEN CLOCK */}
        <div style={{ zIndex: 10, position: "absolute", top: "10%", textAlign: "center", fontFamily: "monospace", color: "rgba(255, 255, 255, 0.9)", textShadow: "0 0 10px rgba(52, 211, 153, 0.5)" }}>
          <div style={{ fontSize: "64px", fontWeight: "900", letterSpacing: "4px" }}>{time}</div>
          <div style={{ fontSize: "18px", fontWeight: "500", letterSpacing: "2px", color: "#34d399", marginTop: "5px" }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
          </div>
        </div>

        <div onClick={handleLogin} style={{ zIndex: 10, cursor: "pointer", textAlign: "center" }}>
          <div style={{ width: "130px", height: "130px", borderRadius: "50%", background: "rgba(39, 39, 42, 0.8)", border: "2px solid #52525b", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(0,0,0,0.5)" }}>
            <User color="white" size={70} />
          </div>
          <h1 style={{ color: "white", marginTop: "24px", fontSize: "32px", fontWeight: "800", letterSpacing: "2px", fontFamily: "sans-serif" }}>ROOT</h1>
          <p style={{ color: "#71717a", fontSize: "14px", marginTop: "8px", fontWeight: "600", fontFamily: "sans-serif" }}>CLICK TO START SESSION</p>
        </div>
      </main>
    );
  }

  if (isBooting) {
    return (
      <main style={{ height: "100vh", backgroundColor: "black", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "20px", position: "relative", fontFamily: "monospace", color: "#d1d5db", fontSize: "14px", lineHeight: "1.4" }}>
        <div style={{ zIndex: 10 }}>
          {visibleLogs.map((log, i) => (
            <div key={i} style={{ marginBottom: "4px", color: log?.includes("[ OK ]") ? "#34d399" : log?.includes("[ ** ]") ? "#fbbf24" : "white" }}>{log}</div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main style={{ height: "100vh", width: "100%", boxSizing: "border-box", backgroundColor: "black", position: "relative", overflow: "hidden", fontFamily: "sans-serif" }}>
      <MatrixRain />

      {/* NAVBAR */}
      <nav style={{ height: "48px", backgroundColor: "rgba(15, 15, 15, 0.9)", backdropFilter: "blur(20px)", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 25px", boxSizing: "border-box", zIndex: 300, borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "25px" }}>
          <LayoutGrid size={20} color="white" />
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "white" }}>
            <span style={{ fontSize: "15px", fontWeight: "900" }}>MEDHA OS</span>
          </div>
        </div>
        <div style={{ flex: 0, color: "white", fontSize: "16px", fontWeight: "900" }}>{time}</div>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "25px", color: "white" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#34d399", backgroundColor: "rgba(52, 211, 153, 0.1)", padding: "4px 10px", borderRadius: "6px", border: "1px solid rgba(52, 211, 153, 0.2)" }}>
            <Timer size={16} />
            <span style={{ fontSize: "13px", fontWeight: "800", letterSpacing: "1px", fontFamily: "monospace" }}>{formatSessionTime(sessionSeconds)}</span>
          </div>
          <div style={{ display: "flex", gap: "15px", borderRight: "2px solid rgba(255,255,255,0.2)", paddingRight: "15px", marginLeft: "5px" }}>
            <Wifi size={20} color="white" />
            <Battery size={20} color="white" />
          </div>
          <div onClick={() => { setIsLogged(false); setHasShownPopup(false); setShowBreakPopup(false); }} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <span style={{ fontSize: "15px", fontWeight: "900" }}>ROOT</span>
            <LogOut size={20} />
          </div>
        </div>
      </nav>

      {/* DESKTOP ICONS */}
      <div style={{ position: "absolute", top: "80px", left: "30px", display: "flex", flexDirection: "column", gap: "30px", zIndex: 50 }}>
        <div onClick={() => openApp('terminal')} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", gap: "8px" }}>
          <div className="desktop-icon" style={{ width: "65px", height: "65px", backgroundColor: "rgba(30, 32, 40, 0.7)", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }}>
            <TerminalIcon color="white" size={32} />
          </div>
          <span style={{ color: "white", fontSize: "13px", fontWeight: "700", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>Terminal</span>
        </div>

        <div onClick={() => openApp('memes')} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", gap: "8px" }}>
          <div className="desktop-icon" style={{ width: "65px", height: "65px", backgroundColor: "rgba(30, 32, 40, 0.7)", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }}>
            <Smile color="#fbbf24" size={32} />
          </div>
          <span style={{ color: "white", fontSize: "13px", fontWeight: "700", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>Memes</span>
        </div>
      </div>

      {/* BREAK POPUP */}
      {showBreakPopup && (
        <div style={{
          position: "absolute", bottom: "40px", right: "40px", zIndex: 400,
          backgroundColor: "rgba(25, 27, 33, 0.85)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px",
          padding: "20px", width: "320px", boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
          display: "flex", flexDirection: "column", gap: "12px",
          animation: "slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "white", fontWeight: "800", fontSize: "15px" }}>
              <Smile size={20} color="#fbbf24" /> Take a Break!
            </div>
            <X size={18} color="#a1a1aa" style={{ cursor: "pointer" }} onClick={() => setShowBreakPopup(false)} />
          </div>
          <p style={{ color: "#d1d5db", fontSize: "14px", margin: 0, lineHeight: "1.5", fontWeight: "500" }}>
            You've been viewing this portfolio for a while! Want to take a quick break and look at some "The Office" memes to freshen up your mood?
          </p>
          <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
            <button onClick={() => openApp('memes')} style={{ flex: 1, backgroundColor: "#fbbf24", color: "black", border: "none", borderRadius: "6px", padding: "10px", fontWeight: "800", cursor: "pointer" }}>
              Show me memes!
            </button>
            <button onClick={() => setShowBreakPopup(false)} style={{ backgroundColor: "transparent", color: "#a1a1aa", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", padding: "10px", fontWeight: "600", cursor: "pointer" }}>
              Dismiss
            </button>
          </div>
          <style dangerouslySetInnerHTML={{__html: `@keyframes slideIn { from { transform: translateY(100px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}} />
        </div>
      )}

      {/* STICKY NOTE */}
      <div style={{
        position: "absolute", top: "90px", right: "60px", width: "210px", padding: "20px",
        backgroundColor: "rgba(252, 211, 77, 0.18)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(252, 211, 77, 0.4)", borderRadius: "2px",
        boxShadow: "15px 15px 35px rgba(0,0,0,0.6)", transform: "rotate(2deg)",
        zIndex: 50, color: "#fcd34d", fontFamily: "'Courier New', Courier, monospace",
      }}>
        <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", width: "70px", height: "24px", backgroundColor: "rgba(252, 211, 77, 0.3)", backdropFilter: "blur(5px)", border: "1px solid rgba(252, 211, 77, 0.2)" }} />
        <div style={{ fontWeight: "900", marginBottom: "12px", borderBottom: "1px solid rgba(252, 211, 77, 0.3)", fontSize: "13px" }}>📌 QUICK TIP</div>
        <p style={{ fontSize: "14px", lineHeight: "1.5", margin: 0, fontWeight: "600" }}>
          System initialized. <br /><br />
          Type <span style={{ color: "white", textDecoration: "underline", fontWeight: "900" }}>help</span> to begin.<br/><br/>
          <em>Press <b>TAB</b> to autocomplete.</em>
        </p>
      </div>

      {/* TERMINAL WINDOW */}
      {terminalOpen && !terminalMinimized && (
        <div onPointerDown={() => setActiveWindow('terminal')} style={{ 
          zIndex: activeWindow === 'terminal' ? 100 : 90, 
          position: terminalFullScreen ? "fixed" : "absolute",
          top: terminalFullScreen ? "0" : "50%", left: terminalFullScreen ? "0" : "45%",
          transform: terminalFullScreen ? "none" : "translate(-50%, -50%)",
          width: terminalFullScreen ? "100%" : "800px", height: terminalFullScreen ? "100%" : "550px", 
          boxSizing: "border-box", 
          backgroundColor: "rgba(12, 14, 18, 0.15)", backdropFilter: "blur(12px) saturate(200%)", 
          borderRadius: terminalFullScreen ? "0px" : "16px", display: "flex", flexDirection: "column",
          transition: "all 0.25s ease-out", overflow: "hidden",
          border: terminalFullScreen ? "none" : "1px solid rgba(255,255,255,0.15)",
          boxShadow: terminalFullScreen ? "none" : "inset 0px 1px 1px rgba(255, 255, 255, 0.2), 0 30px 80px rgba(0,0,0,0.9)"
        }}>
          <div style={{ height: "44px", backgroundColor: activeWindow === 'terminal' ? "rgba(25, 25, 30, 0.8)" : "rgba(25, 25, 30, 0.4)", display: "flex", alignItems: "center", padding: "0 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <div onClick={() => setTerminalOpen(false)} style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ff5f56", cursor: "pointer" }} />
              <div onClick={() => setTerminalMinimized(true)} style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ffbd2e", cursor: "pointer" }} />
              <div onClick={() => setTerminalFullScreen(!terminalFullScreen)} style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#27c93f", cursor: "pointer" }} />
            </div>
            <div style={{ flex: 1, textAlign: "center", color: activeWindow === 'terminal' ? "white" : "#6b7280", fontSize: "14px", fontWeight: "700" }}>medha@portfolio</div>
          </div>
          
          <div style={{ flex: 1, padding: "35px", overflowY: "auto", fontFamily: "monospace", fontSize: "16px", color: "#e5e7eb" }}>
            {history.map((line, i) => (
              <div key={i} style={{ marginBottom: "15px", whiteSpace: "pre-wrap" }}>
                {line.type === 'input' ? <span style={{ fontWeight: "800", color: "#34d399" }}>{line.text}</span> : <span>{line.text}</span>}
              </div>
            ))}
            <form onSubmit={handleCommandSubmit} style={{ display: "flex", gap: "12px" }}>
              <span style={{ color: "#34d399", fontWeight: "900" }}>root@medha %</span>
              <input 
                autoFocus 
                value={command} 
                onChange={(e) => setCommand(e.target.value)} 
                onKeyDown={handleKeyDown} 
                style={{ backgroundColor: "transparent", border: "none", outline: "none", flex: 1, color: "white", fontFamily: "inherit", fontSize: "inherit" }} 
              />
            </form>
          </div>
        </div>
      )}

      {/* MEMES WINDOW */}
      {memesOpen && !memesMinimized && (
        <div onPointerDown={() => setActiveWindow('memes')} style={{ 
          zIndex: activeWindow === 'memes' ? 100 : 90, 
          position: memesFullScreen ? "fixed" : "absolute",
          top: memesFullScreen ? "0" : "40%", left: memesFullScreen ? "0" : "60%",
          transform: memesFullScreen ? "none" : "translate(-50%, -50%)",
          width: memesFullScreen ? "100%" : "600px", height: memesFullScreen ? "100%" : "500px", 
          boxSizing: "border-box", 
          backgroundColor: "rgba(12, 14, 18, 0.15)", backdropFilter: "blur(12px) saturate(200%)", 
          borderRadius: memesFullScreen ? "0px" : "16px", display: "flex", flexDirection: "column",
          transition: "all 0.25s ease-out", overflow: "hidden",
          border: memesFullScreen ? "none" : "1px solid rgba(255,255,255,0.15)",
          boxShadow: memesFullScreen ? "none" : "inset 0px 1px 1px rgba(255, 255, 255, 0.2), 0 30px 80px rgba(0,0,0,0.9)"
        }}>
          <div style={{ height: "44px", backgroundColor: activeWindow === 'memes' ? "rgba(25, 25, 30, 0.8)" : "rgba(25, 25, 30, 0.4)", display: "flex", alignItems: "center", padding: "0 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <div onClick={() => setMemesOpen(false)} style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ff5f56", cursor: "pointer" }} />
              <div onClick={() => setMemesMinimized(true)} style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ffbd2e", cursor: "pointer" }} />
              <div onClick={() => setMemesFullScreen(!memesFullScreen)} style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#27c93f", cursor: "pointer" }} />
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", color: activeWindow === 'memes' ? "white" : "#6b7280", fontSize: "14px", fontWeight: "700" }}>
              <Smile size={16} color="#fbbf24" /> Memes.exe
            </div>
          </div>
          
          <div style={{ flex: 1, padding: "20px", overflowY: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            {officeMemes.map((url, i) => (
              <div key={i} style={{ width: "100%", height: "200px", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(0,0,0,0.6)" }}>
                <img src={url} alt={`Meme ${i}`} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- HOVER GLOW EFFECTS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        .desktop-icon {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .desktop-icon:hover {
          background-color: rgba(52, 211, 153, 0.15) !important;
          border-color: rgba(52, 211, 153, 0.6) !important;
          box-shadow: 0 0 25px rgba(52, 211, 153, 0.5) !important;
          transform: translateY(-4px);
        }
      `}} />
    </main>
  );
}