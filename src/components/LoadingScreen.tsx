"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Cpu, Search, Database } from "lucide-react";

const messages = [
  "Analyzing your profile...",
  "Comparing with 1,000+ career paths...",
  "Running decision logic...",
  "Filtering by reality score...",
  "Consulting AI Advisor...",
  "Generating Top 5 roadmap..."
];

export default function LoadingScreen() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((v) => (v + 1) % messages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg-color)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      {/* Cool Animated Centerpiece */}
      <div style={{ position: "relative", marginBottom: "3rem" }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "30%",
            border: "2px solid var(--primary)",
            opacity: 0.2,
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            width: "120px",
            height: "120px",
            borderRadius: "30%",
            border: "2px solid var(--accent)",
            opacity: 0.15,
          }}
        />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "var(--primary)" }}>
            <Cpu size={40} />
        </div>
      </div>

      {/* Pulsing Text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={msgIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{ textAlign: "center" }}
        >
          <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
            {messages[msgIdx]}
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Our engine is fine-tuning your results.</p>
        </motion.div>
      </AnimatePresence>

      {/* Progress Line */}
      <div style={{ width: "200px", height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", marginTop: "3rem", overflow: "hidden" }}>
          <motion.div 
            animate={{ x: [-200, 200] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ width: "100%", height: "100%", background: "linear-gradient(to right, transparent, var(--primary), transparent)" }}
          />
      </div>
    </motion.div>
  );
}
