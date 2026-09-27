import React from "react";
import { Copyright, Dumbbell } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-100 border-t border-base-content/10 mt-10">
      <div className="container max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
        <div className="inline-flex items-center gap-2">
          <Dumbbell className="text-lime-400 size-5" />
          <span className="text-lg font-semibold tracking-wide">FITLOG</span>
        </div>

        <div className="flex items-start gap-2 text-base-content/60">
          <Copyright className="w-4 h-4 shrink-0" />
          <p className="text-sm sm:text-base">
            2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
