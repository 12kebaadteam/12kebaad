"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2, Map, GraduationCap, ChevronRight } from "lucide-react";

const nodes = [
  { icon: GraduationCap, label: "Class 12", x: "10%", y: "40%" },
  { icon: Map, label: "Mapping Paths", x: "40%", y: "20%" },
  { icon: Briefcase, label: "Top Careers", x: "70%", y: "50%" },
  { icon: Building2, label: "Perfect College", x: "90%", y: "30%" },
];

export default function FlowingNodes() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.15, zIndex: -1 }}>
      <svg width="100%" height="100%" style={{ position: 'absolute' }} preserveAspectRatio="xMidYMid slice">
        {/* Animated Connecting Lines */}
        <motion.path
          d="M 120 400 Q 300 200 480 200 T 840 500 T 1100 300"
          fill="none"
          stroke="rgba(59, 130, 246, 0.2)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 120 400 Q 300 200 480 200 T 840 500 T 1100 300"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeDasharray="10 20"
          animate={{ strokeDashoffset: -100 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {nodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -20, 0] 
            }}
            transition={{ 
              delay: i * 0.5,
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{
              position: 'absolute',
              left: node.x,
              top: node.y,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.8rem'
            }}
          >
            <div className="glass-panel" style={{ padding: '1rem', borderRadius: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Icon size={24} color="var(--primary)" />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {node.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
