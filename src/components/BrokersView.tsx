import React from 'react';
import { Broker } from '../types';

interface BrokersViewProps {
  brokers: Broker[];
  onOpenBrokerModal: (broker: Broker) => void;
  onBackToOverview: () => void;
}

export const BrokersView: React.FC<BrokersViewProps> = ({
  brokers,
  onOpenBrokerModal,
  onBackToOverview,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="pb-6 border-b border-[#1e222d] mb-8">
        <button
          onClick={onBackToOverview}
          className="text-xs text-[#2962ff] hover:underline flex items-center space-x-1 mb-2"
        >
          <span>← Back to Overview</span>
        </button>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Verified Broker Integrations</h1>
        <p className="text-xs text-[#787b86] mt-1 max-w-2xl leading-relaxed">
          Connect your existing brokerage accounts directly to TradingView. Place orders, monitor live positions, and execute trades without leaving your charts.
        </p>
      </div>

      {/* Grid of Verified Brokers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {brokers.map((broker) => (
          <div
            key={broker.id}
            className="bg-[#131722] border border-[#1e222d] hover:border-[#2a2e39] rounded-2xl p-6 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{broker.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      ★ {broker.rating} {broker.ratingText}
                    </span>
                    <span className="text-xs text-[#787b86]">{broker.badge}</span>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-xl bg-[#1e222d] border border-[#2a2e39] flex items-center justify-center font-extrabold text-base text-white">
                  {broker.name.slice(0, 2).toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 my-6 p-4 bg-[#0a0d14] rounded-xl border border-[#1e222d] text-xs">
                <div>
                  <span className="text-[#787b86] block">Spreads / Fees</span>
                  <span className="text-white font-semibold mt-0.5 block">{broker.spreads}</span>
                </div>
                <div>
                  <span className="text-[#787b86] block">Min Deposit</span>
                  <span className="text-white font-semibold mt-0.5 block">{broker.minDeposit}</span>
                </div>
                <div>
                  <span className="text-[#787b86] block">Assets</span>
                  <span className="text-white font-semibold mt-0.5 block">{broker.types.join(', ')}</span>
                </div>
                <div>
                  <span className="text-[#787b86] block">Integration</span>
                  <span className="text-emerald-400 font-semibold mt-0.5 block">Native TradingView</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#1e222d]">
              <span className="text-xs text-[#787b86]">
                {broker.connected ? '● Account connected' : 'Verified Partner'}
              </span>
              <button
                onClick={() => onOpenBrokerModal(broker)}
                className="bg-[#2962ff] hover:bg-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-md cursor-pointer"
              >
                {broker.connected ? 'Manage Account' : 'Connect Account →'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
