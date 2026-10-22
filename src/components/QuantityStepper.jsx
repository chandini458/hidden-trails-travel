// This controlled input receives its value and update handler from its parent.
export default function QuantityStepper({ value, onChange, label }) {
  return (
    <div className="flex items-center gap-2" aria-label={`${label} traveler count`}>
      <span className="text-xs font-semibold text-trail-muted">Travelers</span>
      <div className="inline-flex items-center overflow-hidden rounded-md border border-trail-border bg-white">
        <button
          className="grid size-9 place-items-center text-lg font-semibold text-trail-green transition hover:bg-trail-tint disabled:cursor-not-allowed disabled:text-trail-muted/50"
          type="button"
          aria-label={`Remove one traveler from ${label}`}
          onClick={() => onChange(Math.max(1, value - 1))}
          disabled={value <= 1}
        >
          −
        </button>
        <output className="min-w-8 text-center text-sm font-bold tabular-nums" aria-live="polite">{value}</output>
        <button
          className="grid size-9 place-items-center text-lg font-semibold text-trail-green transition hover:bg-trail-tint disabled:cursor-not-allowed disabled:text-trail-muted/50"
          type="button"
          aria-label={`Add one traveler to ${label}`}
          onClick={() => onChange(Math.min(12, value + 1))}
          disabled={value >= 12}
        >
          +
        </button>
      </div>
    </div>
  );
}