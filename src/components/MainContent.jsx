import { useEffect, useMemo, useState } from 'react';
import QuantityStepper from './QuantityStepper.jsx';

// Reusable destination card keeps each repeated item consistent and data-driven.
function DestinationCard({ destination, travelers, onTravelersChange }) {
  return (
    <article className="group min-w-0 overflow-hidden rounded-[14px] border border-trail-border bg-trail-surface shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-lifted">
      <img className="h-52 w-full transition duration-500 group-hover:scale-[1.03] sm:h-56" src={destination.image} alt={destination.imageAlt || destination.name} loading="lazy" />
      <div className="relative space-y-3 p-5 sm:p-6">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-trail-orange">{destination.category}</span>
        <h3 className="font-display text-2xl leading-tight text-trail-forest">{destination.name}</h3>
        <p className="min-h-6 text-sm text-trail-muted">{destination.description}</p>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-trail-border pt-3 text-sm">
          <span className="font-semibold text-trail-green">◷ {destination.duration}</span>
          <strong className="text-trail-ink">{destination.price}</strong>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <QuantityStepper value={travelers} onChange={onTravelersChange} label={destination.name} />
          <a className="inline-flex min-h-10 items-center justify-center rounded-full border-2 border-trail-orange bg-trail-orange px-4 text-xs font-bold text-white transition hover:border-trail-green hover:bg-trail-green" href="#contact" aria-label={`Plan a trip to ${destination.name}`}>
            Explore →
          </a>
        </div>
      </div>
    </article>
  );
}

// MainContent owns the destination filter state and the site's supporting sections.
export default function MainContent({ destinations = [], loading = false, travelStyles = [], benefits = [], testimonials = [], user = null }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const travelerCounts = useMemo(
    () => Object.fromEntries(destinations.map((destination) => [destination.id ?? destination.slug, 1])),
    [destinations],
  );

  const [counts, setCounts] = useState(travelerCounts);

  useEffect(() => {
    setCounts(Object.fromEntries(destinations.map((destination) => [destination.id ?? destination.slug, 1])));
  }, [destinations]);

  const filters = useMemo(
    () => ['All', ...new Set(destinations.map((destination) => destination.category))],
    [destinations],
  );

  const visibleDestinations = activeFilter === 'All'
    ? destinations
    : destinations.filter((destination) => destination.category === activeFilter);

  function updateTravelerCount(destinationId, count) {
    setCounts((currentCounts) => ({ ...currentCounts, [destinationId]: count }));
  }

  return (
    <main>
      <section className="mx-auto w-[calc(100%-2rem)] max-w-site py-12 sm:w-[calc(100%-3rem)] sm:py-[76px]" id="destinations">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-extrabold tracking-[0.16em] text-trail-orange">POPULAR DESTINATIONS</p>
            <h2 className="mb-2 font-display text-3xl leading-tight text-trail-forest sm:text-4xl">Featured Escapes</h2>
            <p className="text-sm text-trail-muted sm:text-base">Handpicked tour packages for unforgettable journeys.</p>
          </div>
          <a className="text-sm font-bold text-trail-green transition hover:text-trail-orange" href="#travel-styles">Find your escape →</a>
        </div>

        {user && (
          <div className="mb-6 rounded-2xl border border-trail-green/30 bg-trail-peach p-3 text-sm font-medium text-trail-forest">
            Signed in as {user.name}. Your travel profile is ready.
          </div>
        )}

        {loading ? (
          <div className="rounded-[16px] border border-trail-border bg-trail-surface p-6 text-center text-trail-muted">
            Loading destination data from the live API...
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap gap-2" aria-label="Filter destinations by travel style">
              {filters.map((filter) => {
                const isActive = filter === activeFilter;
                return (
                  <button
                    className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition ${isActive ? 'border-trail-green bg-trail-green text-white' : 'border-trail-border bg-trail-surface text-trail-green hover:border-trail-green'}`}
                    type="button"
                    key={filter}
                    aria-pressed={isActive}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {visibleDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id ?? destination.slug}
                  destination={destination}
                  travelers={counts[destination.id ?? destination.slug] ?? 1}
                  onTravelersChange={(count) => updateTravelerCount(destination.id ?? destination.slug, count)}
                />
              ))}
            </div>
            {visibleDestinations.length === 0 && <p className="py-8 text-center text-trail-muted">No destinations match this filter.</p>}
          </>
        )}
      </section>

      <section className="bg-trail-tint py-12 sm:py-[76px]" id="travel-styles">
        <div className="mx-auto w-[calc(100%-2rem)] max-w-site sm:w-[calc(100%-3rem)]">
          <div className="mb-7">
            <p className="mb-2 text-xs font-extrabold tracking-[0.16em] text-trail-orange">TRAVEL YOUR WAY</p>
            <h2 className="mb-2 font-display text-3xl leading-tight text-trail-forest sm:text-4xl">Find Your Travel Style</h2>
            <p className="text-sm text-trail-muted sm:text-base">Not sure where to go? Find the experience that feels like you.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {travelStyles.map((style) => (
              <article className="grid min-w-0 grid-cols-[38%_minmax(0,1fr)] overflow-hidden rounded-[14px] border border-trail-border bg-trail-surface transition hover:-translate-y-1 sm:block" key={style.title}>
                <img className="h-full min-h-48 w-full sm:h-44 sm:min-h-0" src={style.image} alt={style.imageAlt} loading="lazy" />
                <div className="p-4 sm:p-5">
                  <span className="mb-2 inline-block text-2xl leading-none text-trail-orange" aria-hidden="true">{style.icon}</span>
                  <h3 className="mb-2 font-display text-xl text-trail-forest">{style.title}</h3>
                  <p className="mb-3 text-sm text-trail-muted">{style.description}</p>
                  <a className="text-sm font-bold text-trail-green hover:text-trail-orange" href="#contact">{style.link} →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-[calc(100%-2rem)] max-w-site py-12 sm:w-[calc(100%-3rem)] sm:py-[76px]" id="why-us">
        <div className="mb-7">
          <p className="mb-2 text-xs font-extrabold tracking-[0.16em] text-trail-orange">OUR PROMISE</p>
          <h2 className="mb-2 font-display text-3xl leading-tight text-trail-forest sm:text-4xl">Why Travel With Us?</h2>
          <p className="text-sm text-trail-muted sm:text-base">We make travel simple, personal and unforgettable.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {benefits.map((benefit) => (
            <article className="flex min-w-0 items-start gap-3" key={benefit.title}>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-trail-peach text-2xl text-trail-forest" aria-hidden="true">{benefit.icon}</span>
              <div>
                <h3 className="mb-1 font-sans text-sm font-bold text-trail-forest">{benefit.title}</h3>
                <p className="text-sm text-trail-muted">{benefit.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-trail-tint py-12 sm:py-[76px]" id="testimonials">
        <div className="mx-auto w-[calc(100%-2rem)] max-w-site sm:w-[calc(100%-3rem)]">
          <div className="mb-7">
            <p className="mb-2 text-xs font-extrabold tracking-[0.16em] text-trail-orange">TRAVELER STORIES</p>
            <h2 className="mb-2 font-display text-3xl leading-tight text-trail-forest sm:text-4xl">What Our Travelers Say</h2>
            <p className="text-sm text-trail-muted sm:text-base">Real stories from travelers who explored with us.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article className="min-w-0 rounded-[14px] border border-trail-border bg-trail-surface p-5 transition hover:-translate-y-1 sm:p-6" key={testimonial.reviewer}>
                <div className="mb-3 text-lg text-[#e69a30]" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote className="mb-5 font-display text-base leading-relaxed text-trail-ink">{testimonial.quote}</blockquote>
                <p className="mb-0 text-sm font-bold text-trail-green">{testimonial.reviewer} <span className="font-normal text-trail-muted">· {testimonial.location}</span></p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-right text-xs text-trail-muted">Sample testimonials for this practice project.</p>
        </div>
      </section>

      <section className="bg-cover bg-center px-4 py-14 text-center text-white sm:py-[75px]" style={{ backgroundImage: "linear-gradient(rgba(22,45,34,.82), rgba(22,45,34,.82)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85')" }}>
        <div className="mx-auto max-w-site">
          <p className="mb-2 text-xs font-extrabold tracking-[0.16em] text-[#ffe0c8]">YOUR NEXT CHAPTER AWAITS</p>
          <h2 className="mb-3 font-display text-3xl leading-tight sm:text-5xl">Ready for Your Next Escape?</h2>
          <p className="mb-6 text-sm text-[#f0f0e9] sm:text-base">Let's plan a trip that you'll never forget.</p>
          <a className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-trail-orange bg-trail-orange px-6 font-bold text-white transition hover:border-trail-green hover:bg-trail-green" href="#contact">Plan Your Trip →</a>
        </div>
      </section>
    </main>
  );
}