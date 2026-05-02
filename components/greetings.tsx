"use client";

import { useEffect, useState } from "react";

export default function Greeting() {
  const [greeting, setGreeting] = useState("Hello");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // This prevents Vercel from throwing an error about the server time not matching your browser time
  if (!mounted) return null;

  return (
    <span className="animate-pulse duration-1000 opacity-90 transition-opacity text-green-400">
      {greeting}, welcome to my portfolio.
    </span>
  );
}