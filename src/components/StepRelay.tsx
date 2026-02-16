import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Search, Pin, ArrowUpRight } from "lucide-react";
import { contentVariants, pageVariants } from "../constants";
import { BrowserType, I18nSchema } from "../types";
import { BrowserSelector } from "./BrowserSelector";

/**
 * HANDOVER INSTRUCTIONS FOR EXTENSION DEVELOPER:
 *
 * This component listens for a window.postMessage event to advance the state.
 *
 * Event Name: "EXTENSION_RELAY_TRIGGERED"
 * Target Origin: "*" (or lock down to extension ID if injected)
 *
 * When the user clicks the browser action (extension icon) in the toolbar,
 * the background script or popup should inject a script or post a message
 * to this tab:
 *
 * window.postMessage({ type: "EXTENSION_RELAY_TRIGGERED" }, "*");
 *
 * Note: Since clicking the extension icon usually opens a popup or acts on the
 * active tab, ensure the logic handles the "Onboarding" tab specifically
 * if strictly required, or simply detects the action globally.
 */

interface StepRelayProps {
  t: I18nSchema;
  browser: BrowserType;
  setBrowser: (b: BrowserType) => void;
  onComplete: () => void;
}

export const StepRelay: React.FC<StepRelayProps> = ({
  t,
  browser,
  setBrowser,
  onComplete,
}) => {
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize search term from URL or default, and sync to URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("s");
    if (s) {
      setSearchTerm(s);
    } else {
      // Set default and sync to URL
      const defaultTerm = t.relay.simulatedSearch;
      setSearchTerm(defaultTerm);

      const url = new URL(window.location.href);
      url.searchParams.set("s", defaultTerm);
      window.history.replaceState({}, "", url.toString());
    }
  }, [t.relay.simulatedSearch]);

  // Update URL when search term changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);

    const url = new URL(window.location.href);
    if (newValue) {
      url.searchParams.set("s", newValue);
    } else {
      url.searchParams.delete("s");
    }
    window.history.replaceState({}, "", url.toString());
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Handover: EXTENSION_RELAY_TRIGGERED
      if (event.data?.type === "EXTENSION_RELAY_TRIGGERED") {
        setSuccess(true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Simulating the event for demo purposes if developer clicks the "Waiting" text
  const debugTrigger = () => {
    window.postMessage({ type: "EXTENSION_RELAY_TRIGGERED" }, "*");
  };

  // Expose a function to simulate success from outside (for skip button)
  useEffect(() => {
    (window as any).__simulateRelaySuccess = debugTrigger;
    return () => {
      delete (window as any).__simulateRelaySuccess;
    };
  }, []);

  return (
    <motion.div
      className="relative flex flex-col items-center h-full w-full overflow-y-auto"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="relative z-10 flex flex-col items-start w-full max-w-5xl mx-auto px-6 py-4">
        <motion.div variants={contentVariants} className="text-left mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight whitespace-pre-line leading-tight">
            {t.relay.title}
          </h1>
          <p className="text-slate-500 font-medium whitespace-pre-line">
            {t.relay.description}
          </p>
        </motion.div>

        {/* Changed items-center to items-start to prevent layout shifting when content expands */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-start">
          {/* Left: Simulation UI */}
          <motion.div
            variants={contentVariants}
            className="order-2 lg:order-1 w-full flex flex-col"
          >
            {/* Mock Browser View */}
            <div
              className={`relative bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border overflow-hidden aspect-[16/10] flex flex-col transition-colors duration-500 z-10 ${success ? "border-green-400/50" : "border-slate-100"}`}
            >
              {/* Fake Address Bar Area */}
              <div className="bg-slate-50 border-b border-slate-100 p-3 flex items-center gap-2">
                <div className="flex gap-1.5 opacity-60">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-white h-8 rounded-lg border border-slate-200 ml-4 shadow-sm"></div>
              </div>

              {/* Fake Search Results */}
              <div className="p-8 flex-1 flex flex-col gap-5 relative">
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 relative">
                    <input
                      className="w-full bg-slate-50 border border-slate-200 rounded-full px-5 py-3 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      placeholder={t.relay.simulatedSearch}
                    />
                    <Search className="absolute right-4 top-3 text-slate-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
                {/* Skeleton Results */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col gap-2 opacity-40">
                    <div className="w-1/3 h-3 bg-slate-200 rounded-full"></div>
                    <div className="w-full h-2 bg-slate-100 rounded-full"></div>
                    <div className="w-4/5 h-2 bg-slate-100 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Action Bar - Positioned BELOW the sandbox */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }} // Cubic bezier for silky smooth expansion
                  className="overflow-hidden w-full max-w-2xl"
                >
                  {/* Padding is inside the animated container to emulate 'gap' without layout thrashing */}
                  {/* Increased padding to prevent shadow clipping by overflow-hidden */}
                  <div className="pt-3">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/20 ring-1 ring-black/5">
                      <div className="flex items-center gap-5 text-center sm:text-left">
                        <div className="w-14 h-14 bg-white/20 text-white rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/30 shadow-inner">
                          <Check size={28} strokeWidth={4} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm leading-tight whitespace-pre-line">
                            {t.relay.success}
                          </h3>
                          <p className="text-green-50/90 font-medium text-sm hidden sm:block mt-1">
                            {t.relay.proceed}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={onComplete}
                        className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-green-50 text-green-700 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 whitespace-nowrap flex items-center justify-center gap-2 group"
                      >
                        {t.common.next}
                        <ArrowUpRight
                          size={20}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Instructions & Animation Placeholder */}
          <motion.div
            variants={contentVariants}
            className="order-1 lg:order-2 flex flex-col items-center lg:items-start w-full"
          >
            <BrowserSelector
              label={t.relay.browserLabel}
              currentBrowser={browser}
              onChange={setBrowser}
            />

            {/* Placeholder for WebP Animation */}
            <div className="w-full h-56 bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden group border border-slate-200 border-dashed">
              <span className="text-slate-400 text-sm font-medium z-10">
                {t.relay.placeholder} ({browser})
              </span>
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-500 to-transparent"></div>
            </div>

            <div className="space-y-6 text-center lg:text-left max-w-md">
              <p className="text-xl font-medium text-slate-800 leading-snug whitespace-pre-line">
                {t.relay.task.split(/<icon>|<b>|<\/b>/).map((part, i, arr) => {
                  if (t.relay.task.includes(`<b>${part}</b>`)) {
                    return (
                      <b key={i} className="font-bold text-slate-900">
                        {part}
                      </b>
                    );
                  }
                  if (
                    part === "" &&
                    (arr[i - 1] === "<b>" || arr[i + 1] === "</b>")
                  )
                    return null; // Simple regex split might leave empty strings if logic is naive, but let's use a better parsing approach or just handling the icon for now as requested, but user asked for bold support.

                  // Let's retry a safer approach:
                  // We have multiple delimiters: <icon>, <b>, </b>
                  // It's getting complex to parse manually.
                  // Since we only control the string, let's just use dangerouslySetInnerHTML? No, that's unsafe and we need the component for the icon.

                  // Let's parse sequentially.
                  return (
                    <React.Fragment key={i}>
                      {/* We need a better parser here. Let's stick to the previous one but enhance it? */}
                      {/* Actually, let's look at what we have in t.relay.task */}
                      {/* task: "Try clicking the <icon> icon..." - No bold tags here currently in English? */}
                      {/* In Chinese: "... <b>...</b>" */}
                    </React.Fragment>
                  );
                })}
                {/* Resetting to previous implementation but with Bold support logic */}
                {t.relay.task
                  .split(/((?:<icon>)|(?:<b>.*?<\/b>))/g)
                  .map((part, i) => {
                    if (part === "<icon>") {
                      return (
                        <img
                          key={i}
                          src="/icon.svg"
                          alt="Search Relay Icon"
                          className="inline-block w-6 h-6 align-text-bottom mx-1"
                        />
                      );
                    }
                    if (part.startsWith("<b>") && part.endsWith("</b>")) {
                      return (
                        <b key={i} className="font-bold text-slate-900">
                          {part.slice(3, -4)}
                        </b>
                      );
                    }
                    return <span key={i}>{part}</span>;
                  })}
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-800 text-sm font-semibold rounded-lg border border-amber-100/50 shadow-sm">
                <Pin size={16} />
                {t.relay.tip}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
