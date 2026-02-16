import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import {
    SEARCH_ENGINES,
    EXTENSION_ID,
    pageVariants,
    contentVariants,
} from "../constants";
import { I18nSchema } from "../types";

interface StepEngineSelectionProps {
    t: I18nSchema;
    onNext: () => void;
    selectedEngine: string;
    setSelectedEngine: (engine: string) => void;
}

export const StepEngineSelection: React.FC<StepEngineSelectionProps> = ({
    t,
    onNext,
    selectedEngine,
    setSelectedEngine,
}) => {
    // const [selectedEngine, setSelectedEngine] = useState<string>("google"); // Removed internal state
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            // @ts-ignore
            const chromeApi = window.chrome;
            if (
                chromeApi &&
                chromeApi.runtime &&
                chromeApi.runtime.sendMessage &&
                EXTENSION_ID !== "YOUR_EXTENSION_ID_HERE"
            ) {
                await new Promise<void>((resolve) => {
                    chromeApi.runtime.sendMessage(
                        EXTENSION_ID,
                        { action: "setDefaultEngine", engineId: selectedEngine },
                        (response: any) => {
                            console.log("[Onboarding] Set default engine response:", response);
                            resolve();
                        },
                    );
                });
            } else {
                console.warn(
                    "[Onboarding] Extension API not available, simulating success.",
                );
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
        } catch (error) {
            console.error("[Onboarding] Error setting default engine:", error);
        } finally {
            setIsLoading(false);
            onNext();
        }
    };

    return (
        <motion.div
            className="relative flex flex-col items-center justify-center h-full w-full overflow-y-auto"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="relative z-10 flex flex-col items-start w-full max-w-5xl mx-auto px-6 py-4">
                <motion.div variants={contentVariants} className="text-left mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight whitespace-pre-line leading-tight">
                        {t.engineSelection.title}
                    </h1>
                    <p className="text-slate-500 font-medium whitespace-pre-line">
                        {t.engineSelection.subtitle}
                    </p>
                </motion.div>

                <motion.div variants={contentVariants} className="w-full max-w-4xl">
                    <RadioGroup.Root
                        value={selectedEngine}
                        onValueChange={setSelectedEngine}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {SEARCH_ENGINES.map((engine) => {
                            const isSelected = selectedEngine === engine.id;
                            return (
                                <RadioGroup.Item
                                    key={engine.id}
                                    value={engine.id}
                                    className={`relative group flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 outline-none
                  ${isSelected
                                            ? "shadow-md ring-2"
                                            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                                        }
                `}
                                    style={
                                        isSelected
                                            ? {
                                                borderColor: engine.themeColor,
                                                backgroundColor: `${engine.themeColor}10`, // 10 hex = ~6% opacity
                                                // @ts-ignore
                                                "--tw-ring-color": `${engine.themeColor}33`, // 33 hex = ~20% opacity
                                            }
                                            : {}
                                    }
                                >
                                    {/* Logo / Badge */}
                                    <div
                                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center p-2.5 transition-colors overflow-hidden
                    ${isSelected
                                                ? "text-white"
                                                : "bg-slate-100 group-hover:bg-slate-200"
                                            }
                  `}
                                        style={{
                                            backgroundColor: isSelected ? engine.themeColor : undefined,
                                        }}
                                    >
                                        <img
                                            /* @ts-ignore */
                                            src={engine.icon}
                                            alt={engine.name}
                                            className={`w-full h-full object-contain ${isSelected && engine.invertIcon ? "brightness-0 invert" : ""}`}
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                                e.currentTarget.parentElement!.innerText = engine.badge;
                                            }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-lg text-slate-900 truncate">
                                                {engine.name}
                                            </span>
                                            {isSelected && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    style={{ color: engine.themeColor }}
                                                >
                                                    <Check size={20} strokeWidth={3} />
                                                </motion.div>
                                            )}
                                        </div>

                                        <div className="text-xs text-slate-400 font-mono mb-2 truncate">
                                            {engine.url}
                                        </div>

                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            {/* @ts-ignore */}
                                            {t.engineSelection[engine.descriptionKey]}
                                        </p>
                                    </div>
                                </RadioGroup.Item>
                            );
                        })}
                    </RadioGroup.Root>
                </motion.div>

                <motion.div
                    variants={contentVariants}
                    className="mt-12 flex justify-center w-full"
                >
                    <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleConfirm}
                        disabled={isLoading}
                        className="group relative overflow-hidden flex items-center gap-3 text-white px-8 py-3.5 rounded-full font-bold text-lg shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: SEARCH_ENGINES.find((e) => e.id === selectedEngine)
                                ?.themeColor,
                            boxShadow: `0 10px 25px -5px ${SEARCH_ENGINES.find((e) => e.id === selectedEngine)?.themeColor}40`, // Shadow with opacity
                        }}
                    >
                        {isLoading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <>
                                <span className="relative z-10">
                                    {t.engineSelection.continue.replace(
                                        "{engine}",
                                        SEARCH_ENGINES.find((e) => e.id === selectedEngine)?.name ||
                                        "",
                                    )}
                                </span>
                                <ArrowRight
                                    size={20}
                                    className="relative z-10 group-hover:translate-x-1 transition-transform"
                                />
                            </>
                        )}
                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
};
