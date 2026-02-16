import React from 'react';
import { motion } from 'framer-motion';
import { BrowserType } from '../types';
import { Chrome, Globe, Monitor } from 'lucide-react';

interface BrowserSelectorProps {
  currentBrowser: BrowserType;
  onChange: (browser: BrowserType) => void;
  label: string;
}

const browsers = [
  { id: BrowserType.Chrome, label: 'Chrome', icon: Chrome },
  { id: BrowserType.Edge, label: 'Edge', icon: Monitor }, // Using Monitor as proxy for Edge
  { id: BrowserType.Firefox, label: 'Firefox', icon: Globe }, // Using Globe as proxy for Firefox
];

export const BrowserSelector: React.FC<BrowserSelectorProps> = ({ currentBrowser, onChange, label }) => {
  return (
    <div className="flex flex-col items-center space-y-2 mb-6">
      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</span>
      <div className="flex p-1 bg-slate-100 rounded-xl relative">
        {browsers.map((b) => {
          const isActive = currentBrowser === b.id;
          const Icon = b.icon;
          return (
            <button
              key={b.id}
              onClick={() => onChange(b.id)}
              className={`relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-slate-800' : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              <Icon size={14} />
              {b.label}
              {isActive && (
                <motion.div
                  layoutId="activeBrowser"
                  className="absolute inset-0 bg-white shadow-sm rounded-lg -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};