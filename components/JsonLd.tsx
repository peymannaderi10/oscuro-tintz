import { EMAIL, PHONE, SITE_NAME, SITE_URL } from '@/lib/siteMeta';

export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    name: SITE_NAME,
    image: `${SITE_URL}/assets/oscuro-logo.png`,
    '@id': SITE_URL,
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Yuba City',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.1404,
      longitude: -121.6169,
    },
    areaServed: ['Yuba City', 'Marysville', 'Sutter County'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '19:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '87',
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
