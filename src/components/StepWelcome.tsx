import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, Zap } from "lucide-react";
import { contentVariants, pageVariants, EXTENSION_ID } from "../constants";
import { I18nSchema } from "../types";

interface StepWelcomeProps {
  t: I18nSchema;
  onNext: () => void;
  themeColor: string;
}

export const StepWelcome: React.FC<StepWelcomeProps> = ({
  t,
  onNext,
  themeColor,
}) => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    // Attempt to contact the extension
    // @ts-ignore
    const chromeApi = window.chrome;
    console.log("[Onboarding] Checking environment...", {
      hasChrome: !!chromeApi,
      hasRuntime: !!chromeApi?.runtime,
      hasSendMessage: !!chromeApi?.runtime?.sendMessage,
      extensionId: EXTENSION_ID,
    });

    if (
      chromeApi &&
      chromeApi.runtime &&
      chromeApi.runtime.sendMessage &&
      EXTENSION_ID !== ("YOUR_EXTENSION_ID_HERE" as string)
    ) {
      console.log(`[Onboarding] Attempting to send message to ${EXTENSION_ID}`);
      try {
        chromeApi.runtime.sendMessage(
          EXTENSION_ID,
          { action: "saveOnboardingSettings" },
          (response: any) => {
            if (chromeApi.runtime.lastError) {
              console.error(
                "[Onboarding] Error sending message:",
                chromeApi.runtime.lastError,
              );
              setStatus("error");
            } else {
              console.log("[Onboarding] Response from extension:", response);
              setStatus("success");
            }
          },
        );
      } catch (e) {
        console.error("[Onboarding] Exception sending message:", e);
        setStatus("error");
      }
    } else {
      console.warn(
        "[Onboarding] Skipping extension message. Conditions not met:",
        {
          extensionIdSet: EXTENSION_ID !== ("YOUR_EXTENSION_ID_HERE" as string),
          chromeAvailable: !!(
            chromeApi &&
            chromeApi.runtime &&
            chromeApi.runtime.sendMessage
          ),
        },
      );
    }
  }, []);

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center h-full w-full"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Content Container - Centered and Constrained */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">
        <motion.div variants={contentVariants} className="relative mb-10">
          {/* Logo / Icon Area */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-brand-500 rounded-3xl opacity-20 blur-xl"
            />
            <div className="relative w-full h-full rounded-3xl flex items-center justify-center shadow-2xl shadow-slate-900/20 transform -rotate-3 overflow-hidden">
              <img
                src="/icon.svg"
                alt="Search Relay"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            {t.welcome.title}
          </h1>
          <p className="text-2xl text-slate-500 font-medium leading-relaxed">
            {t.welcome.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={contentVariants}
          className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-sm mb-12 max-w-lg"
        >
          <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
            {t.welcome.description}
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="group relative overflow-hidden flex items-center gap-3 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all"
          style={{
            backgroundColor: themeColor,
            boxShadow: `0 20px 25px -5px ${themeColor}40`,
          }}
        >
          <span className="relative z-10">{t.common.start}</span>
          <ArrowRight
            size={20}
            className="relative z-10 group-hover:translate-x-1 transition-transform"
          />
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </motion.button>

        <div className="mt-6 min-h-[24px]">
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 justify-center text-green-500 font-medium text-sm"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>{t.welcome.successMessage}</span>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 justify-center text-slate-400 font-medium text-sm"
            >
              <div className="w-2 h-2 rounded-full bg-slate-300" />
              <span>{t.welcome.errorMessage}</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
