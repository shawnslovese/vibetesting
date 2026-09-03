import React from 'react';
import { X, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#e0e3eb] p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#787b86] hover:text-[#131722] hover:bg-[#f0f3fa] rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#f0f3fa] mb-3">
            <svg 
              className="w-7 h-7 text-black fill-current" 
              viewBox="0 0 36 28" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 22H7V6h7v16zm15 0h-7V0h7v22z" fill="currentColor"></path>
              <path d="M0 22h7v6H0v-6zm29 0h7v6h-7v-6z" fill="currentColor"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-extrabold text-[#131722]">Join 60M+ Traders & Investors</h3>
          <p className="text-xs text-[#787b86] mt-1">Get real-time market data, advanced charts, and community ideas</p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              alert('Signed in with Google!');
              onClose();
            }}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border border-[#e0e3eb] hover:bg-[#f0f3fa] rounded-xl text-sm font-bold text-[#131722] transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => {
              alert('Signed in with Apple!');
              onClose();
            }}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-black text-white hover:bg-neutral-800 rounded-xl text-sm font-bold transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.99-6.3-9.77-11.27-20.91-14.91-33.41-3.63-12.5-5.46-24.36-5.46-35.58 0-14.54 3.73-26.65 11.19-36.33 7.46-9.68 16.79-14.61 27.99-14.79 5.33 0 11.17 1.41 17.51 4.23 6.34 2.83 10.3 4.31 11.89 4.45 1.5.02 5.56-1.46 12.19-4.45 6.63-2.99 12.44-4.34 17.43-4.06 13.06.82 23.47 5.76 31.23 14.82-11.43 6.89-17.02 16.5-16.78 28.84.24 10.23 4.15 18.79 11.73 25.68 7.58 6.89 16.54 10.74 26.89 11.55-2.02 6.18-4.58 12.79-7.68 19.82zM119.22 33.09c0-7.46 2.67-14.42 8.01-20.89 5.34-6.47 11.97-10.7 19.89-12.7 1.09 7.46-.86 14.72-5.85 21.78-4.99 7.06-11.73 11.53-20.21 13.41-.6-1.04-1.84-1.6-1.84-1.6z" />
            </svg>
            Continue with Apple
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e0e3eb]"></div>
            </div>
            <div className="relative flex justify-center text-xs text-[#787b86]">
              <span className="px-2 bg-white">or sign up with email</span>
            </div>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            alert('Welcome to TradingView!');
            onClose();
          }}>
            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full bg-[#f0f3fa] text-sm text-[#131722] placeholder-[#787b86] px-4 py-2.5 rounded-xl border border-transparent focus:border-[#2962ff] focus:bg-white outline-none mb-3"
            />
            <button
              type="submit"
              className="w-full tv-btn-gradient text-white text-sm font-semibold py-2.5 rounded-xl shadow-xs cursor-pointer hover:opacity-95 transition-opacity"
            >
              Create Free Account
            </button>
          </form>
        </div>

        <div className="mt-6 pt-4 border-t border-[#e0e3eb] space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#787b86]">
            <Check className="w-3.5 h-3.5 text-[#089981]" />
            <span>Unlimited real-time stock & crypto quotes</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#787b86]">
            <Check className="w-3.5 h-3.5 text-[#089981]" />
            <span>Multi-timeframe charts and volume indicators</span>
          </div>
        </div>
      </div>
    </div>
  );
};
