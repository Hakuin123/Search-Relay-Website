import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { BookOpen, Languages, Settings, Sparkles } from "lucide-react";
import { contentVariants, pageVariants } from "../constants";
import { I18nSchema } from "../types";

interface StepCompletionProps {
  t: I18nSchema;
}

export const StepCompletion: React.FC<StepCompletionProps> = ({ t }) => {
  const triggerConfetti = () => {
    const duration = 1 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="relative mb-10 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="bg-gradient-to-br from-yellow-300 to-amber-500 w-20 h-20 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-amber-500/20"
        >
          <Sparkles size={40} fill="currentColor" />
        </motion.div>

        <h1 className="text-4xl font-bold text-slate-900 mb-3">
          {t.completion.title}
        </h1>
        <p className="text-xl text-slate-500 mb-4">{t.completion.subtitle}</p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4"
        variants={contentVariants}
      >
        <Card
          icon={Settings}
          title={t.completion.card1Title}
          desc={t.completion.card1Desc}
          color="bg-slate-900 text-white"
        />
        <Card
          icon={Languages}
          title={t.completion.card2Title}
          desc={t.completion.card2Desc}
          color="bg-white text-brand-600 border border-slate-100"
        />
        <Card
          icon={BookOpen}
          title={t.completion.card3Title}
          desc={t.completion.card3Desc}
          color="bg-white text-emerald-600 border border-slate-100"
        />
      </motion.div>
    </motion.div>
  );
};

const Card = ({
  icon: Icon,
  title,
  desc,
  color,
}: {
  icon: any;
  title: string;
  desc: string;
  color: string;
}) => (
  <motion.button
    whileHover={{ y: -5 }}
    className={`p-6 rounded-2xl shadow-lg shadow-slate-200/50 flex flex-col items-start text-left transition-colors ${color}`}
  >
    <div className="mb-4 p-2 bg-opacity-10 bg-black rounded-lg w-fit">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-sm opacity-80 leading-relaxed">{desc}</p>
  </motion.button>
);
