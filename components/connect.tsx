"use client";

import { useEffect, useState } from "react";

export const ConnectButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed z-50 right-0  flex justify-end items-end p-4 transition-colors duration-300 ${
        isScrolled ? "bg-white/80" : "bg-transparent"
      }`}
    >
      {/* @ts-ignore */}
      <radix-connect-button />
    </div>
  );
};
