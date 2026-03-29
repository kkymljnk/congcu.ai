"use client";

import Link from 'next/link';
import { ArrowLeft, User, Lock, Chrome } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden font-[var(--font-inter)]">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-sm md:max-w-md px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Glass Card */}
        <div className="p-8 md:p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-white/50 text-sm">Sign in to AI Creative Station</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Account / Email</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input 
                  type="text" 
                  placeholder="name@example.com" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded border-white/20 bg-black/40 text-blue-500 focus:ring-blue-500/50 w-4 h-4" />
                <span className="text-white/50 group-hover:text-white/80 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-3 rounded-xl transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(79,70,229,0.3)] mt-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-4 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
            <span className="text-xs text-white/40 uppercase tracking-wider">Or continue with</span>
          </div>

          <div className="mt-6">
            <button className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 rounded-xl transition-all active:scale-[0.98]">
              <Chrome className="w-5 h-5" />
              <span>Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
