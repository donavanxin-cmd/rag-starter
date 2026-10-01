import React, { useState } from 'react';
import { PINE_SCRIPT_PRESETS } from '../../data/mockData';

interface PineScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyToChart?: (scriptCode: string) => void;
}

export const PineScriptModal: React.FC<PineScriptModalProps> = ({
  isOpen,
  onClose,
  onApplyToChart,
}) => {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentScript = PINE_SCRIPT_PRESETS[selectedPreset];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentScript.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e222d] bg-[#1e222d]">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-sm font-bold text-[#2962ff] bg-[#2962ff]/10 px-2 py-0.5 rounded border border-[#2962ff]/20">
              v5
            </span>
            <div>
              <h3 className="text-base font-bold text-white">Pine Script® Documentation & Editor</h3>
              <p className="text-[11px] text-[#787b86]">
                TradingView's proprietary programming language for custom indicators & algorithmic strategies
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#787b86] hover:text-white p-1 rounded transition text-lg"
          >
            ✕
          </button>
        </div>

        {/* Script Selection Bar */}
        <div className="flex items-center space-x-2 px-6 py-3 border-b border-[#1e222d] bg-[#0f121a] overflow-x-auto text-xs">
          {PINE_SCRIPT_PRESETS.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => setSelectedPreset(idx)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
                selectedPreset === idx
                  ? 'bg-[#2962ff] text-white shadow-sm'
                  : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Code View */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#0a0d14] font-mono text-xs text-[#d1d4dc] leading-relaxed">
          <pre className="p-4 bg-[#131722] border border-[#1e222d] rounded-xl overflow-x-auto selection:bg-[#2962ff] selection:text-white">
            <code>{currentScript.code}</code>
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#1e222d] bg-[#131722]">
          <div className="text-[11px] text-[#787b86]">
            Compatible with Supercharts indicator engine
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#1e222d] hover:bg-[#2a2e39] text-white border border-[#2a2e39] transition"
            >
              {copied ? '✓ Copied to clipboard' : 'Copy Pine Code'}
            </button>
            {onApplyToChart && (
              <button
                onClick={() => {
                  onApplyToChart(currentScript.code);
                  onClose();
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#2962ff] hover:bg-blue-600 text-white transition shadow-sm"
              >
                Apply to Superchart →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
