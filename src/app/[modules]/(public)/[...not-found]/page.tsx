import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const Page = () => {
  return (
    <div className="min-h-[100dvh] bg-black text-white flex flex-col items-center justify-center relative overflow-hidden font-[var(--font-inter)] z-50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-8xl md:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/30 mb-4 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">Oops! Mất kết nối</h2>
        <p className="text-white/50 text-base md:text-lg mb-10 max-w-sm mx-auto">
          Tọa độ này không tồn tại trong hệ thống bộ nhớ của AI Creative Station.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md ring-1 ring-white/20 text-white font-medium px-6 py-3 rounded-full transition-all active:scale-[0.98]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại Trang chủ</span>
        </Link>
      </div>
    </div>
  )
}

export default Page
