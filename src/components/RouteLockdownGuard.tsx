"use client";

import { useState, useEffect } from "react";
import LockdownScreen from "@/components/LockdownScreen";
import { Unlock } from "lucide-react";

interface RouteLockdownGuardProps {
  pageTitle: string;
  pageSubtitle?: string;
  children: React.ReactNode;
}

export default function RouteLockdownGuard({
  pageTitle,
  pageSubtitle,
  children,
}: RouteLockdownGuardProps) {
  const [bypassed, setBypassed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("bypass") === "sixteen2027") {
        sessionStorage.setItem("escape_bypass_lockdown", "true");
        setBypassed(true);
        return;
      }
      const hasBypass = sessionStorage.getItem("escape_bypass_lockdown") === "true";
      if (hasBypass) {
        setBypassed(true);
      }
    }
  }, []);

  if (!mounted) {
    return (
      <LockdownScreen
        pageTitle={pageTitle}
        pageSubtitle={pageSubtitle}
      />
    );
  }

  if (!bypassed) {
    return (
      <LockdownScreen
        pageTitle={pageTitle}
        pageSubtitle={pageSubtitle}
        onBypassSuccess={() => setBypassed(true)}
      />
    );
  }

  return (
    <>
      <div className="w-full bg-[#F5B700] text-[#141414] border-b-4 border-[#141414] py-1.5 px-4 sticky top-0 z-[100] shadow-[0px_3px_0px_#141414]">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-xs font-display uppercase tracking-wider font-semibold">
          <div className="flex items-center gap-2">
            <Unlock className="w-4 h-4 text-[#0B5E2E]" />
            <span>
              MODE PRATINJAU PANITIA 64 &amp; IKAPOS: Halaman &quot;{pageTitle}&quot; sedang dikunci untuk pengunjung umum.
            </span>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("escape_bypass_lockdown");
              setBypassed(false);
            }}
            className="bg-[#BA1A1A] text-white px-2.5 py-0.5 border border-[#141414] hover:bg-black cursor-pointer shadow-comic-sm font-medium"
          >
            Kunci Kembali ✕
          </button>
        </div>
      </div>
      {children}
    </>
  );
}
