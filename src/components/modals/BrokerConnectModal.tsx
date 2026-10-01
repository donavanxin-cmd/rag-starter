import React, { useState } from 'react';
import { Broker } from '../../types';

interface BrokerConnectModalProps {
  broker: Broker | null;
  isOpen: boolean;
  onClose: () => void;
  onConnect: (brokerId: string) => void;
}

export const BrokerConnectModal: React.FC<BrokerConnectModalProps> = ({
  broker,
  isOpen,
  onClose,
  onConnect,
}) => {
  const [accountType, setAccountType] = useState<'demo' | 'live'>('demo');
  const [connecting, setConnecting] = useState(false);

  if (!isOpen || !broker) return null;

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      onConnect(broker.id);
      setConnecting(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#787b86] hover:text-white transition text-lg"
        >
          ✕
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#1e222d] border border-[#2a2e39] flex items-center justify-center font-bold text-white text-sm">
            {broker.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{broker.name}</h3>
            <span className="text-xs text-[#089981] font-medium">{broker.badge}</span>
          </div>
        </div>

        <div className="space-y-3 bg-[#0a0d14] p-4 rounded-xl border border-[#1e222d] text-xs text-[#d1d4dc] mb-5">
          <div className="flex justify-between">
            <span className="text-[#787b86]">Typical Spreads:</span>
            <span className="font-semibold text-white">{broker.spreads}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#787b86]">Min Deposit:</span>
            <span className="font-semibold text-white">{broker.minDeposit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#787b86]">Supported Assets:</span>
            <span className="font-semibold text-white">{broker.types.join(', ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#787b86]">Integration:</span>
            <span className="font-semibold text-emerald-400">Direct TradingView API</span>
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-xs font-semibold text-[#b2b5be] mb-2">Select Account Mode</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setAccountType('demo')}
              className={`p-3 rounded-xl border text-left transition ${
                accountType === 'demo'
                  ? 'bg-[#2962ff]/10 border-[#2962ff] text-white'
                  : 'bg-[#1e222d] border-[#2a2e39] text-[#787b86] hover:text-white'
              }`}
            >
              <div className="font-bold text-xs">Practice Demo</div>
              <div className="text-[11px] text-[#787b86] mt-0.5">$100,000 virtual balance</div>
            </button>
            <button
              type="button"
              onClick={() => setAccountType('live')}
              className={`p-3 rounded-xl border text-left transition ${
                accountType === 'live'
                  ? 'bg-[#2962ff]/10 border-[#2962ff] text-white'
                  : 'bg-[#1e222d] border-[#2a2e39] text-[#787b86] hover:text-white'
              }`}
            >
              <div className="font-bold text-xs">Live Broker Account</div>
              <div className="text-[11px] text-[#787b86] mt-0.5">Real capital execution</div>
            </button>
          </div>
        </div>

        <button
          onClick={handleConnect}
          disabled={connecting}
          className="w-full bg-[#2962ff] hover:bg-blue-600 active:scale-[0.98] text-white font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-blue-500/20"
        >
          {connecting ? 'Authorizing direct connection...' : `Connect with ${broker.name}`}
        </button>

        <p className="text-center text-[10px] text-[#555865] mt-3">
          Zero latency execution directly inside TradingView Supercharts
        </p>
      </div>
    </div>
  );
};
