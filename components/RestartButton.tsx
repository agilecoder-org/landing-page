"use client"
import { RotateCcw } from "lucide-react";
import React from 'react';

interface RestartButtonProps {
  onClick: () => void;
}

const RestartButton: React.FC<RestartButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm group"
      aria-label="Restart Animation"
    >
      <RotateCcw className="w-6 h-6 text-white/70 group-hover:text-white group-hover:-rotate-90 transition-all duration-500" />
    </button>
  );
};

export default RestartButton;
