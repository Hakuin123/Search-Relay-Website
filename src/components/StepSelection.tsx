import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MousePointerClick, ArrowUpRight } from "lucide-react";
import { contentVariants, pageVariants } from "../constants";
import { BrowserType, I18nSchema } from "../types";
import { BrowserSelector } from "./BrowserSelector";

/**
 * HANDOVER INSTRUCTIONS FOR EXTENSION DEVELOPER:
 *
 * Event Name: "EXTENSION_SELECTION_TRIGGERED"
 * Target Origin: "*"
 *
 * Logic:
 * 1. Content script detects selection on this page.
 * 2. User clicks the extension's floating icon or context menu.
 * 3. Extension sends `window.postMessage({ type: "EXTENSION_SELECTION_TRIGGERED" }, "*")`.
 */

interface StepSelectionProps {
  t: I18nSchema;
  browser: BrowserType;
  setBrowser: (b: BrowserType) => void;
  onComplete: () => void;
}

export const StepSelection: React.FC<StepSelectionProps> = ({
  t,
  browser,
  setBrowser,
  onComplete,
}) => {
  const [success, setSuccess] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Handover: EXTENSION_SELECTION_TRIGGERED
      if (event.data?.type === "EXTENSION_SELECTION_TRIGGERED") {
        setSuccess(true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Expose success state to parent via onComplete when skipped or completed
  useEffect(() => {
    if (success) {
      // Logic handled in parent or here if needed, but here we just update UI
    }
  }, [success]);

  const debugTrigger = () => {
    window.postMessage({ type: "EXTENSION_SELECTION_TRIGGERED" }, "*");
  };

  // Expose a function to simulate success from outside (for skip button)
  useEffect(() => {
    (window as any).__simulateSelectionSuccess = debugTrigger;
    return () => {
      delete (window as any).__simulateSelectionSuccess;
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
            {t.selection.title}
          </h1>
          <p className="text-slate-500 font-medium whitespace-pre-line">
            {t.selection.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-start">
          {/* Left: Interactive Area */}
          <motion.div
            variants={contentVariants}
            className="order-2 lg:order-1 w-full flex flex-col items-center"
          >
            <div
              className={`w-full max-w-2xl relative bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border h-[340px] flex flex-col items-start overflow-hidden transition-colors duration-500 z-10 ${success ? "border-brand-400/50" : "border-slate-100"}`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-200 via-brand-500 to-brand-200 opacity-50 z-20"></div>

              {/* Scrollable Content Area with Hidden Scrollbar */}
              <div
                className="relative group z-10 w-full h-full overflow-y-auto no-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar Firefox/IE
              >
                {/* Hide scrollbar Webkit */}
                <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
              `}</style>

                <div className="p-6 md:p-8">
                  <p
                    ref={textRef}
                    className="text-lg font-serif text-slate-700 leading-loose cursor-text whitespace-pre-line pb-12"
                  >
                    {t.selection.ozSnippet}
                  </p>
                </div>
              </div>

              {/* Bottom Fade Mask - Reduced height */}
              <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent pointer-events-none z-20"></div>
            </div>

            {/* Success Action Bar - Positioned BELOW the sandbox */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
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
                            {t.selection.success}
                          </h3>
                          <p className="text-green-50/90 font-medium text-sm hidden sm:block mt-1">
                            {t.selection.excellent}
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

          {/* Right: Guide */}
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
            <div className="w-full h-56 bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden border border-slate-200 border-dashed">
              <span className="text-slate-400 text-sm font-medium z-10">
                {t.selection.placeholder} ({browser})
              </span>
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brand-400 to-transparent"></div>
            </div>

            <div className="space-y-4 text-center lg:text-left max-w-md">
              <p className="text-xl font-medium text-slate-800 leading-snug whitespace-pre-line">
                {t.selection.task
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
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
