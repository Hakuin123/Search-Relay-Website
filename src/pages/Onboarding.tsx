import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, Search } from "lucide-react";
import { Step, Language, BrowserType } from "../types";
import { TRANSLATIONS } from "../constants";
import { StepWelcome } from "../components/StepWelcome";
import { StepRelay } from "../components/StepRelay";
import { StepSelection } from "../components/StepSelection";
import { StepEngineSelection } from "../components/StepEngineSelection";
import { StepCompletion } from "../components/StepCompletion";
import { SEARCH_ENGINES } from "../constants";

export default function App() {
  const [step, setStep] = useState<Step>(Step.Welcome);
  const [lang, setLang] = useState<Language>(() => {
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith("zh") ? "zh" : "en";
  });
  const [browser, setBrowser] = useState<BrowserType>(BrowserType.Chrome);
  const [selectedEngineId, setSelectedEngineId] = useState<string>("google");

  const currentThemeColor =
    SEARCH_ENGINES.find((e) => e.id === selectedEngineId)?.themeColor ||
    "#4285F4";

  // Browser Detection
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("firefox")) setBrowser(BrowserType.Firefox);
    else if (ua.includes("edg")) setBrowser(BrowserType.Edge);
    else setBrowser(BrowserType.Chrome);
  }, []);

  // Sync language with document
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === "zh" ? "Search Relay - 欢迎" : "Search Relay - Welcome";
  }, [lang]);

  const t = TRANSLATIONS[lang];
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const nextStep = () => setStep((s) => Math.min(s + 1, Step.Completion));
  const prevStep = () => setStep((s) => Math.max(s - 1, Step.Welcome));

  const toggleLang = () => setLang((l) => (l === "en" ? "zh" : "en"));

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 overflow-hidden flex flex-col relative font-sans">
      {/* Top Progress Bar */}
      <div className="h-1.5 w-full bg-slate-100 fixed top-0 left-0 z-50">
        <motion.div
          className="h-full"
          style={{ backgroundColor: currentThemeColor }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Header / Logo (Top Left) */}
      <div className="absolute top-6 left-8 z-40 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-slate-900/20 overflow-hidden">
          <img
            src="/icon.svg"
            alt="Search Relay"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-bold text-lg text-slate-900 tracking-tight">
          Search Relay
        </span>
      </div>

      {/* Language Switcher (Top Right) */}
      <div className="absolute top-6 right-6 z-40">
        <button
          onClick={toggleLang}
          className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:border-slate-300 transition-colors shadow-sm"
        >
          {lang === "en" ? "中文" : "English"}
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative pt-24 pb-20">
        <AnimatePresence mode="wait">
          {step === Step.Welcome && (
            <StepWelcome
              key="welcome"
              t={t}
              onNext={nextStep}
              themeColor={currentThemeColor}
            />
          )}
          {step === Step.EngineSelection && (
            <StepEngineSelection
              key="engine-selection"
              t={t}
              onNext={nextStep}
              selectedEngine={selectedEngineId}
              setSelectedEngine={setSelectedEngineId}
            />
          )}
          {step === Step.Relay && (
            <StepRelay
              key="relay"
              t={t}
              browser={browser}
              setBrowser={setBrowser}
              onComplete={nextStep}
            />
          )}
          {step === Step.Selection && (
            <StepSelection
              key="selection"
              t={t}
              browser={browser}
              setBrowser={setBrowser}
              onComplete={nextStep}
            />
          )}
          {step === Step.Completion && (
            <StepCompletion key="completion" t={t} />
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-8 left-8 z-40 flex items-center gap-4"
      >
        <button
          onClick={prevStep}
          disabled={step === Step.Welcome}
          className={`w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 transition-all ${step === Step.Welcome ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50 hover:shadow-md"}`}
          aria-label={t.common.back}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="text-sm font-medium text-slate-400">
          {t.common.step} <span className="text-slate-900">{step}</span> / 5
        </div>
      </motion.div>

      {/* Skip Button (Optional, for Steps 3 & 4) */}
      {(step === Step.Relay || step === Step.Selection) && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={`skip-btn-${step}`}
          onClick={(e) => {
            const btn = e.currentTarget;
            const isSimulated = btn.dataset.simulated === "true";

            if (!isSimulated) {
              // First click: Simulate Success
              if (step === Step.Relay) {
                const simulate = (window as any).__simulateRelaySuccess;
                if (simulate) simulate();
              } else if (step === Step.Selection) {
                const simulate = (window as any).__simulateSelectionSuccess;
                if (simulate) simulate();
              }
              // Mark as simulated so next click proceeds
              btn.dataset.simulated = "true";
            } else {
              // Second click: Proceed
              nextStep();
              // Reset for next step handled by key change
            }
          }}
          className="fixed bottom-8 right-8 text-slate-400 text-xs hover:text-slate-600 transition-colors"
        >
          {t.common.skip}
        </motion.button>
      )}
    </div>
  );
}
