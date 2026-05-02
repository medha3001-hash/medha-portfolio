"use client";

import { useEffect, useState } from "react";

export default function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/view-count')
      .then((res) => res.json())
      .then((data) => setViews(data.views));
  }, []);

  if (views === null) return <span className="text-gray-500">Loading views...</span>;

  return <span className="text-blue-400">Total Visitors: {views}</span>;
}