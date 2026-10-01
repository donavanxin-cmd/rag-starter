import React, { useState } from 'react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(email);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#787b86] hover:text-white transition text-lg"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Logo and Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#1e222d] border border-[#2a2e39] flex items-center justify-center mb-3">
            <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 36 28">
              <path fillRule="evenodd" d="M14 22H7V6h7v16zm8-22h-7v28h7V0zm8 10h-7v18h7V10z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {mode === 'signup' ? 'Welcome to TradingView' : 'Sign in to your account'}
          </h2>
          <p className="text-xs text-[#787b86] mt-1.5 max-w-xs">
            {mode === 'signup'
              ? 'Join 100 million traders and investors taking the future into their own hands.'
              : 'Access your saved supercharts, watchlists, and community alerts.'}
          </p>
        </div>

        {/* Social Quick Auth */}
        <div className="space-y-2.5 mb-5">
          <button
            onClick={() => {
              onSuccess('trader@google.com');
              onClose();
            }}
            type="button"
            className="w-full flex items-center justify-center space-x-3 bg-[#1e222d] hover:bg-[#2a2e39] border border-[#2a2e39] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.25 21.37 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.26C.46 8.16 0 9.98 0 12s.46 3.84 1.26 5.43l4.02-3.14z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.63 1.26 6.57l4.02 3.14c.95-2.83 3.6-4.96 6.72-4.96z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => {
              onSuccess('trader@apple.com');
              onClose();
            }}
            type="button"
            className="w-full flex items-center justify-center space-x-3 bg-[#1e222d] hover:bg-[#2a2e39] border border-[#2a2e39] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.62-.75 1.04-1.79.93-2.83-.9.04-1.99.6-2.64 1.36-.57.65-1.06 1.72-.93 2.73 1.01.08 2.02-.51 2.64-1.26z" />
            </svg>
            <span>Continue with Apple</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-[#1e222d] w-full" />
          <span className="bg-[#131722] px-3 text-[11px] text-[#787b86] uppercase tracking-wider relative">
            or with email
          </span>
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-[#b2b5be] mb-1">
              Email address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1e222d] border border-[#2a2e39] text-white text-xs rounded-xl px-3.5 py-2.5 focus:border-[#2962ff] focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="w-full bg-[#2962ff] hover:bg-blue-600 active:scale-[0.98] text-white text-xs font-bold py-3 rounded-xl transition shadow-lg shadow-blue-500/20"
          >
            {submitted ? 'Setting up workspace...' : mode === 'signup' ? 'Get started for free' : 'Sign In'}
          </button>
        </form>

        {/* Terms and Mode Switcher */}
        <div className="mt-5 text-center text-[11px] text-[#787b86]">
          {mode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#2962ff] hover:underline font-semibold"
              >
                Sign in
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-[#2962ff] hover:underline font-semibold"
              >
                Sign up free
              </button>
            </p>
          )}
          <p className="mt-2 text-[10px] text-[#555865]">
            $0 forever • No credit card required • Instant access to charts
          </p>
        </div>
      </div>
    </div>
  );
};
