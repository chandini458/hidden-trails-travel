// The header owns the site's primary navigation and responsive call to action.
export default function Header({ user, onAuthToggle, onSignOut }) {
  return (
    <header className="sticky top-0 z-50 border-b border-trail-border bg-trail-surface/95 backdrop-blur">
      <nav className="mx-auto flex w-[calc(100%-2rem)] max-w-site flex-wrap items-center justify-between gap-3 py-3 sm:w-[calc(100%-3rem)] lg:min-h-[78px] lg:flex-nowrap lg:gap-7 lg:py-0" aria-label="Main navigation">
        <a className="flex shrink-0 items-center gap-2.5" href="#home">
          <span className="font-display text-3xl leading-none text-trail-green sm:text-4xl" aria-hidden="true">△</span>
          <span>
            <strong className="block font-display text-lg leading-tight text-trail-forest sm:text-xl">Hidden Trails</strong>
            <small className="block text-[10px] leading-tight text-trail-muted sm:text-[11px]">Travel deeper. Discover differently.</small>
          </span>
        </a>

        <ul className="order-3 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-0.5 text-xs font-semibold sm:gap-x-6 sm:text-sm lg:order-none lg:w-auto lg:gap-x-5">
          <li><a className="py-1 transition-colors hover:text-trail-orange" href="#home">Home</a></li>
          <li><a className="py-1 transition-colors hover:text-trail-orange" href="#destinations">Destinations</a></li>
          <li><a className="py-1 transition-colors hover:text-trail-orange" href="#travel-styles">Travel Styles</a></li>
          <li><a className="py-1 transition-colors hover:text-trail-orange" href="#why-us">Why Us</a></li>
          <li><a className="py-1 transition-colors hover:text-trail-orange" href="#testimonials">Stories</a></li>
        </ul>

        <div className="flex items-center gap-3">
          {user && (
            <span className="hidden text-xs font-semibold text-trail-green sm:inline-block">
              Hi, {user.name.split(' ')[0]}
            </span>
          )}
          <button
            className="inline-flex min-h-10 items-center justify-center rounded-full border-2 border-trail-orange bg-trail-orange px-3 text-xs font-bold text-white transition hover:border-trail-green hover:bg-trail-green sm:px-5 sm:text-sm"
            type="button"
            onClick={user ? onSignOut : onAuthToggle}
          >
            {user ? 'Sign out' : 'Sign in'}
          </button>
        </div>
      </nav>
    </header>
  );
}