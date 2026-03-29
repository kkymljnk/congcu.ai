// app/page.tsx
export default function Page() {
  return (
    <main className="bg-black text-white">
      {/* HERO VIDEO — sát đỉnh (nav fixed h-16 → kéo lên -mt-16) */}
      <section id="features" className="relative h-[92vh] min-h-[560px] -mt-16">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero.mp4" // đổi sang đường dẫn video của bạn
          autoPlay
          muted
          loop
          playsInline
        />
        {/* overlay tăng tương phản */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />

        {/* nội dung hero */}
        <div className="relative z-10 text-center px-8 mt-5 space-y-6 sm:space-y-8 md:space-y-10">
  <h1 className="text-4xl md:text-7xl font-semibold text-white tracking-wider">
    Create Everything
  </h1>

  <p className="mt-4 mb-2 text-white/80 max-w-2xl">
              Build, ship, and scale your ideas—no limits, no excuses.
            </p>

            {/* ====== HÀNG NÚT AI (đã nới khoảng trống & giảm size) ====== */}
             <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center">

              {/* AI Image */}
              <a
                href="#ai-image"
                className="
                  group inline-flex items-center justify-between
                  w-[180px] h-[72px] rounded-[16px]
                  bg-white/10 backdrop-blur-md ring-1 ring-white/10
                  shadow-sm hover:bg-white/15 transition
                  px-4
                "
              >
                <span className="inline-flex items-center gap-2">
                  <svg
                    width="18" height="18" viewBox="0 0 24 24"
                    className="text-white/85 shrink-0"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <span className="text-sm font-semibold">AI Image</span>
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24"
                  className="text-white/70 group-hover:text-white transition"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>

              {/* AI Video */}
              <a
                href="#ai-video"
                className="
                  group inline-flex items-center justify-between
                  w-[180px] h-[72px] rounded-[16px]
                  bg-white/10 backdrop-blur-md ring-1 ring-white/10
                  shadow-sm hover:bg-white/15 transition
                  px-4
                "
              >
                <span className="inline-flex items-center gap-2">
                  <svg
                    width="18" height="18" viewBox="0 0 24 24"
                    className="text-white/85 shrink-0"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="6" width="14" height="12" rx="2" />
                    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                  </svg>
                  <span className="text-sm font-semibold">AI Video</span>
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24"
                  className="text-white/70 group-hover:text-white transition"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
            {/* ====== /HÀNG NÚT AI ====== */}
          </div>
      </section>

      {/* SECTION: Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Giá</h2>
        <p className="text-white/80 max-w-2xl">
          Linh hoạt theo nhu cầu: chọn gói phù hợp và nâng cấp bất cứ lúc nào.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">Starter</h3>
            <p className="text-white/70 mt-2">Dành cho bắt đầu</p>
            <div className="text-3xl font-bold mt-4">
              $9<span className="text-lg font-medium">/mo</span>
            </div>
            <ul className="mt-6 space-y-2 text-white/80 text-sm">
              <li>• 5 dự án</li>
              <li>• Hỗ trợ cơ bản</li>
              <li>• Cập nhật theo tháng</li>
            </ul>
            <a
              href="#get-started"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-xl px-4 ring-1 ring-white/20 hover:bg-white/10"
            >
              Bắt đầu
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">Pro</h3>
            <p className="text-white/70 mt-2">Dành cho nhóm</p>
            <div className="text-3xl font-bold mt-4">
              $29<span className="text-lg font-medium">/mo</span>
            </div>
            <ul className="mt-6 space-y-2 text-white/80 text-sm">
              <li>• Không giới hạn dự án</li>
              <li>• Hỗ trợ ưu tiên</li>
              <li>• Cập nhật hàng tuần</li>
            </ul>
            <a
              href="#get-started"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-xl px-4 ring-1 ring-white/20 hover:bg-white/10"
            >
              Dùng Pro
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">Enterprise</h3>
            <p className="text-white/70 mt-2">Cho doanh nghiệp</p>
            <div className="text-3xl font-bold mt-4">Tuỳ chỉnh</div>
            <ul className="mt-6 space-y-2 text-white/80 text-sm">
              <li>• SLA & Onboarding</li>
              <li>• Bảo mật & tuân thủ</li>
              <li>• Hỗ trợ 24/7</li>
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-xl px-4 ring-1 ring-white/20 hover:bg-white/10"
            >
              Liên hệ
            </a>
          </div>
        </div>
      </section>

      {/* SECTION: Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Liên hệ</h2>
        <p className="text-white/80 max-w-2xl">
          Cần demo hay tư vấn triển khai? Gửi yêu cầu cho chúng tôi.
        </p>
        <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 h-11 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="Tên"
          />
          <input
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 h-11 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="Email"
            type="email"
          />
          <textarea
            className="md:col-span-2 w-full rounded-xl bg-white/5 border border-white/10 p-4 min-h-[120px] outline-none focus:ring-2 focus:ring-white/20"
            placeholder="Nội dung"
          />
          <button className="md:col-span-2 inline-flex h-11 items-center justify-center rounded-xl px-5 ring-1 ring-white/20 hover:bg-white/10">
            Gửi yêu cầu
          </button>
        </form>
      </section>
    </main>
  );
}
