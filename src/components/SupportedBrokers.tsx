import React from 'react';
import { Broker } from '../types';

interface SupportedBrokersProps {
  brokers: Broker[];
  onOpenBrokerModal: (broker: Broker) => void;
  onSeeAllBrokers: () => void;
}

export const SupportedBrokers: React.FC<SupportedBrokersProps> = ({
  brokers,
  onOpenBrokerModal,
  onSeeAllBrokers,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10" data-purpose="supported-brokers" id="brokers">
      <div className="flex items-center justify-between pb-4 border-b border-[#1e222d] mb-6">
        <h3 className="text-lg font-bold text-white">Trade directly with verified brokers</h3>
        <button
          onClick={onSeeAllBrokers}
          className="text-xs text-[#2962ff] hover:underline cursor-pointer flex items-center space-x-1"
        >
          <span>See all brokers</span>
          <span>→</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {brokers.map((broker) => (
          <div
            key={broker.id}
            onClick={() => onOpenBrokerModal(broker)}
            className="bg-[#131722] border border-[#1e222d] p-4 rounded-xl flex flex-col justify-between hover:border-[#2a2e39] transition group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-sm group-hover:text-[#2962ff] transition">
                  {broker.name}
                </span>
                {broker.connected && (
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    Connected
                  </span>
                )}
              </div>
              <div className="text-[11px] text-[#787b86] mt-1">{broker.badge}</div>
            </div>

            <div className="mt-4 text-xs font-semibold text-[#2962ff] group-hover:underline flex items-center space-x-1">
              <span>{broker.connected ? 'Manage account' : 'Open account'}</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
