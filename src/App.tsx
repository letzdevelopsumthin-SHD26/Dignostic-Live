/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Activity, 
  Ear, 
  Cloud, 
  Mic as MicIcon, 
  Scan, 
  History as HistoryIcon, 
  Car, 
  HelpCircle,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Waveform = () => {
  return (
    <div className="absolute bottom-10 left-0 right-0 h-16 flex items-center justify-center gap-[2px] px-8">
      {[...Array(17)].map((_, i) => {
        const isCenter = i === 8;
        return (
          <motion.div
            key={i}
            className={`w-1 rounded-full ${isCenter ? 'bg-primary shadow-[0_0_10px_#f26500]' : 'bg-secondary/60'}`}
            animate={{
              height: [
                isCenter ? 64 : Math.random() * 40 + 10,
                isCenter ? 48 : Math.random() * 40 + 10,
                isCenter ? 64 : Math.random() * 40 + 10
              ]
            }}
            transition={{
              duration: 0.5 + Math.random() * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
};

const Viewfinder = () => {
  return (
    <div className="relative aspect-square w-full bg-[#0c0e11] rounded-xl overflow-hidden border border-white/5 shadow-2xl">
      {/* AR HUD Elements */}
      <div className="absolute inset-0 scanline pointer-events-none opacity-50"></div>
      
      {/* Corners */}
      <div className="absolute top-4 left-4 border-l-2 border-t-2 border-secondary-dim w-8 h-8 opacity-40"></div>
      <div className="absolute top-4 right-4 border-r-2 border-t-2 border-secondary-dim w-8 h-8 opacity-40"></div>
      <div className="absolute bottom-4 left-4 border-l-2 border-b-2 border-secondary-dim w-8 h-8 opacity-40"></div>
      <div className="absolute bottom-4 right-4 border-r-2 border-b-2 border-secondary-dim w-8 h-8 opacity-40"></div>

      {/* Center Target */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 rounded-full border border-secondary-dim/10 flex items-center justify-center">
          <motion.div 
            className="w-32 h-32 rounded-full border border-secondary-dim/30 flex items-center justify-center relative"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-0.5 h-6 bg-secondary-dim absolute top-0"></div>
            <div className="w-0.5 h-6 bg-secondary-dim absolute bottom-0"></div>
            <div className="h-0.5 w-6 bg-secondary-dim absolute left-0"></div>
            <div className="h-0.5 w-6 bg-secondary-dim absolute right-0"></div>
          </motion.div>
        </div>
      </div>

      {/* Engine Image */}
      <img 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOvjv9NyIzeKzgBzYgmQHXVxVIaAyovqhJfYFsyEYrNgXLC76OakavxZK--UPfTyTANhVP-GwOUPFle0L1zXTKnxJid9ufNxj-PuPIudWEPG__E7rPGZ6Ouq45p1QuZE_sVZ_yWlA-NEoMg7sp-j1Z-9VB6u7MFYfMAYFEpHJGnSgLRCwo-TuWhLhfGDUrvs_OVH4gpnN3xzQ-3s35E4HO2sm8JJesojxlWx5_HvS3RkjpoP6pSJxi06mHLf1ibNEwugEVuVWELRCO" 
        alt="Engine View"
        className="w-full h-full object-cover opacity-40 grayscale brightness-75"
        referrerPolicy="no-referrer"
      />

      {/* Data Readouts */}
      <div className="absolute top-8 left-8 space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-dim animate-pulse"></div>
          <span className="text-[10px] font-headline tracking-widest text-secondary uppercase">RPM MONITOR</span>
        </div>
        <p className="text-2xl font-headline font-bold text-on-surface">0842</p>
      </div>

      <div className="absolute top-8 right-8 text-right space-y-1">
        <div className="flex items-center gap-2 justify-end">
          <span className="text-[10px] font-headline tracking-widest text-primary uppercase">SOUND LEVEL</span>
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
        </div>
        <p className="text-2xl font-headline font-bold text-on-surface">42 <span className="text-sm font-normal text-on-surface-variant">dB</span></p>
      </div>

      <Waveform />
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="min-h-screen flex flex-col hud-grid">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-primary" />
          <h1 className="font-headline uppercase tracking-widest text-sm font-bold text-primary">DIAGNOSTIC_LIVE</h1>
        </div>
        <div className="h-8 w-8 rounded-full overflow-hidden border border-primary/20">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV6STUqlHhTxG0bhpmPHCsWVg9gjWITQkk0BHxOIT1P62WHbxNJblLBy5PIj4QeidFlRBMz7fOHzODsur_yKDMiRdv67WQFG-s_VVec0FfSo4xfPaGmz9-ul-5T-galI1G8oIM5JFBNtkeItAv5uHv0P7H5chncwmEa1h1TMuayWRGPqDq2sxtTFWQoxe4zEVwF8uWf_NthufrSPSHH-NKdFSbDkMfpAMLJoOf7PIOxt3hbuMAAPXbAoHDBxk3tj3PnxQklhrRqjqd" 
            alt="User" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      <main className="flex-grow px-4 pt-6 pb-32 max-w-md mx-auto w-full flex flex-col gap-6">
        {/* Status Bar */}
        <div className="flex justify-between items-end border-l-2 border-secondary pl-4">
          <div>
            <p className="text-[10px] font-headline tracking-[0.2em] text-secondary/60 uppercase">System Status: Active</p>
            <h2 className="font-headline text-2xl font-bold tracking-tighter text-on-surface">DIAGNÓSTICO ACÚSTICO</h2>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-primary bg-primary-container/10 px-2 py-0.5 rounded border border-primary/20">V.2.4.0_AI</span>
          </div>
        </div>

        {/* Main Viewfinder */}
        <Viewfinder />

        {/* Instruction Box */}
        <div className="bg-surface border-l-4 border-primary p-4 rounded-r-xl shadow-lg">
          <div className="flex gap-3">
            <Ear className="w-5 h-5 text-primary shrink-0" />
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Escucha para detectar <span className="text-on-surface font-semibold italic">chirridos de correa</span>, <span className="text-on-surface font-semibold italic">golpeteos de motor</span> o <span className="text-on-surface font-semibold italic">siseos de vacío</span>.
            </p>
          </div>
        </div>

        {/* Smoke Analysis */}
        <div className="bg-surface/50 p-5 rounded-xl border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-secondary" />
              <h3 className="font-headline text-sm font-bold tracking-tight uppercase">Análisis de Humo</h3>
            </div>
            <span className="text-[10px] text-on-surface-variant bg-white/5 px-2 py-0.5 rounded">VISUAL AI</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Blanco', color: 'bg-white' },
              { label: 'Azul', color: 'bg-blue-400' },
              { label: 'Negro', color: 'bg-black border border-white/20' }
            ].map((opt) => (
              <button 
                key={opt.label}
                className="flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-lg group"
              >
                <div className={`w-8 h-8 rounded-full ${opt.color} shadow-inner group-active:scale-90 transition-transform`}></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-on-surface">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Recording Button */}
      <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-40">
        <div className="relative">
          <AnimatePresence>
            {isRecording && (
              <>
                <motion.div 
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-primary rounded-full"
                />
                <motion.div 
                  initial={{ scale: 1, opacity: 0.3 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 border-2 border-primary rounded-full"
                />
              </>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
              isRecording 
                ? 'bg-red-500 shadow-red-500/40 scale-110' 
                : 'bg-gradient-to-br from-primary to-primary-container shadow-primary-container/40 active:scale-90'
            }`}
          >
            <MicIcon className={`w-8 h-8 ${isRecording ? 'text-white' : 'text-background'}`} />
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-background/90 backdrop-blur-xl border-t border-white/5">
        {[
          { id: 'scanner', icon: Scan, label: 'Scanner' },
          { id: 'history', icon: HistoryIcon, label: 'History' },
          { id: 'vehicle', icon: Car, label: 'Vehicle' },
          { id: 'help', icon: HelpCircle, label: 'Help' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 px-4 py-1 transition-all duration-300 ${
              activeTab === tab.id 
                ? 'text-background bg-primary rounded-xl scale-105' 
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-tight">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
