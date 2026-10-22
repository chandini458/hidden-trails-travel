// The footer groups contact information, social links, and secondary navigation.
export default function Footer() {
  return (
    <footer className="bg-trail-forest text-[#f5f0e6]" id="contact">
      <div className="mx-auto grid w-[calc(100%-2rem)] max-w-site grid-cols-1 gap-7 py-10 sm:w-[calc(100%-3rem)] sm:grid-cols-2 sm:gap-10 sm:py-14 lg:grid-cols-[1.5fr_.8fr_1.2fr_1fr]">
        <div>
          <a className="flex items-center gap-2.5" href="#home">
            <span className="font-display text-4xl leading-none text-white" aria-hidden="true">△</span>
            <span>
              <strong className="block font-display text-xl leading-tight text-white">Hidden Trails</strong>
              <small className="block text-[11px] text-[#d2d9d0]">Travel deeper. Discover differently.</small>
            </span>
          </a>
          <p className="mt-4 text-sm text-[#d2d9d0]">Thoughtful journeys. Extraordinary memories.</p>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-base font-bold text-white">Quick Links</h2>
          <ul className="grid gap-2 text-sm text-[#d2d9d0]">
            <li><a className="hover:text-trail-peach" href="#home">Home</a></li>
            <li><a className="hover:text-trail-peach" href="#destinations">Destinations</a></li>
            <li><a className="hover:text-trail-peach" href="#travel-styles">Travel Styles</a></li>
            <li><a className="hover:text-trail-peach" href="#why-us">Why Us</a></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-base font-bold text-white">Get in Touch</h2>
          <address className="not-italic text-sm text-[#d2d9d0]">
            <a className="break-all hover:text-trail-peach" href="mailto:hello@hiddentrails.example">hello@hiddentrails.example</a>
            <p className="mt-3 text-[#d2d9d0]">Plan your next adventure with us.</p>
            <p className="text-[#d2d9d0]">Travel inspiration from around the world.</p>
          </address>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-base font-bold text-white">Follow the Journey</h2>
          <div className="flex flex-col items-start gap-2 text-sm text-[#d2d9d0]">
            <a className="hover:text-trail-peach" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="hover:text-trail-peach" href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">Pinterest</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex w-[calc(100%-2rem)] max-w-site flex-col gap-2 py-4 text-xs text-[#d2d9d0] sm:w-[calc(100%-3rem)] sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 text-[#d2d9d0]">© 2026 Hidden Trails · Practice project</p>
          <a className="hover:text-trail-peach" href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}