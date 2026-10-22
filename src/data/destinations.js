// All destination cards are driven by this array instead of repeated JSX.
export const destinations = [
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    category: 'Island Escape',
    description: 'Temples, beaches and lush landscapes.',
    duration: '7 Days',
    price: '₹75,000',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Lush tropical scenery in Bali',
  },
  {
    id: 'morocco',
    name: 'Morocco',
    category: 'Desert Adventure',
    description: 'Deserts, ancient cities and rich culture.',
    duration: '8 Days',
    price: '₹95,000',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Golden desert dunes in Morocco',
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    category: 'Mountain Retreat',
    description: 'Mountains, lakes and charming towns.',
    duration: '6 Days',
    price: '₹1,20,000',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Beautiful mountain landscape in the Swiss Alps',
  },
];

// Travel-style cards retain the original site's featured experiences.
export const travelStyles = [
  {
    title: 'The Adventurer',
    description: 'For thrill seekers and nature lovers.',
    link: 'Explore Adventures',
    icon: '△',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Hiker exploring a mountain trail',
  },
  {
    title: 'The Slow Traveller',
    description: 'For relaxed getaways and meaningful moments.',
    link: 'Explore Slow Travel',
    icon: '☼',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Colorful coastal Italian village',
  },
  {
    title: 'The Culture Seeker',
    description: 'For history, food and local experiences.',
    link: 'Explore Culture',
    icon: '⌂',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Historic architecture in a city',
  },
];

export const benefits = [
  { icon: '✿', title: 'Handpicked Destinations', description: 'Unique places, away from the crowds.' },
  { icon: '♧', title: 'Small Group Travel', description: 'More meaningful and personal experiences.' },
  { icon: '♡', title: 'Local Expertise', description: 'Authentic experiences with local guides.' },
  { icon: '✓', title: 'Hassle-Free Planning', description: 'We handle the details so you can enjoy the journey.' },
];

export const testimonials = [
  {
    quote: '"Bali was a dream! Everything was so well organized and the experience was truly unforgettable."',
    reviewer: 'Priya S.',
    location: 'India',
  },
  {
    quote: '"The Morocco trip went beyond amazing. Beautiful places, great people and perfect planning."',
    reviewer: 'Rahul M.',
    location: 'India',
  },
  {
    quote: '"Loved the Swiss Alps tour! Stunning views and a once-in-a-lifetime experience."',
    reviewer: 'Aisha K.',
    location: 'UAE',
  },
];