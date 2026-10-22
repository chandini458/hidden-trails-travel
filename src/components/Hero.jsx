// The hero keeps the original destination-led message and image-led first view.
export default function Hero() {
  return (
    <section
      className="relative isolate flex min-h-[530px] items-center overflow-hidden bg-cover bg-center text-white sm:min-h-[510px]"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=2000&q=85')" }}
      aria-labelledby="hero-title"
      id="home"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d2420]/90 via-[#0d2420]/65 to-[#0d2420]/20 sm:to-transparent" />
      <div className="mx-auto w-[calc(100%-2rem)] max-w-site py-12 sm:w-[calc(100%-3rem)] sm:py-16">
        <p className="mb-3 text-xs font-extrabold tracking-[0.16em] text-[#ffe0c8]">EXPLORE · EXPERIENCE · BELONG</p>
        <h1 id="hero-title" className="mb-5 max-w-[690px] font-display text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-7xl">
          The world is bigger<br className="hidden sm:block" /> than your bucket list.
        </h1>
        <p className="mb-7 max-w-[510px] text-base text-[#f0f0e9] sm:text-lg">
          Curated travel experiences to breathtaking destinations, made for curious souls and unforgettable stories.
        </p>
        <a className="inline-flex min-h-12 items-center gap-3 rounded-full border-2 border-trail-orange bg-trail-orange px-6 font-bold text-white transition hover:-translate-y-0.5 hover:border-trail-green hover:bg-trail-green" href="#contact">
          Plan Your Trip <span aria-hidden="true">→</span>
        </a>
        <div className="mt-7 flex max-w-2xl flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-white sm:text-sm">
          <span>✈ Curated Experiences</span>
          <span>◎ Authentic Destinations</span>
          <span>♧ Small Group Travel</span>
        </div>
        <p className="mt-5 inline-block rounded-[5px_18px_5px_18px] bg-[#fff0dc] px-4 py-2 font-display text-base italic text-trail-forest sm:absolute sm:bottom-16 sm:right-2 sm:rotate-[-4deg] sm:text-lg">
          Your next story starts here.
        </p>
      </div>
    </section>
  );
}