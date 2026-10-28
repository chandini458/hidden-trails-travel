import dotenv from 'dotenv';
import { pool } from '../config/db.js';

dotenv.config();

const destinations = [
  {
    slug: 'bali',
    name: 'Bali, Indonesia',
    category: 'Island Escape',
    description: 'Temples, beaches and lush landscapes.',
    duration: '7 Days',
    price: '₹75,000',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Lush tropical scenery in Bali',
  },
  {
    slug: 'morocco',
    name: 'Morocco',
    category: 'Desert Adventure',
    description: 'Deserts, ancient cities and rich culture.',
    duration: '8 Days',
    price: '₹95,000',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Golden desert dunes in Morocco',
  },
  {
    slug: 'swiss-alps',
    name: 'Swiss Alps',
    category: 'Mountain Retreat',
    description: 'Mountains, lakes and charming towns.',
    duration: '6 Days',
    price: '₹1,20,000',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Beautiful mountain landscape in the Swiss Alps',
  },
];

async function seedDestinations() {
  const client = await pool.connect();

  try {
    for (const destination of destinations) {
      await client.query(
        `INSERT INTO destinations (slug, name, category, description, duration, price, image, image_alt)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (slug) DO UPDATE SET
           name = EXCLUDED.name,
           category = EXCLUDED.category,
           description = EXCLUDED.description,
           duration = EXCLUDED.duration,
           price = EXCLUDED.price,
           image = EXCLUDED.image,
           image_alt = EXCLUDED.image_alt`,
        [
          destination.slug,
          destination.name,
          destination.category,
          destination.description,
          destination.duration,
          destination.price,
          destination.image,
          destination.imageAlt,
        ],
      );
    }

    console.log('Seeded destination data successfully.');
  } finally {
    client.release();
    await pool.end();
  }
}

seedDestinations().catch((error) => {
  console.error('Failed to seed destination data:', error);
  process.exit(1);
});
