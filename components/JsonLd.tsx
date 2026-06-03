import {
  EMAIL,
  GOOGLE_MAPS_URL,
  INSTAGRAM_URL,
  OWNER_NAME,
  PHONE,
  REVIEW_COUNT,
  REVIEW_RATING,
  SITE_NAME,
  SITE_URL,
  TIKTOK_URL,
} from '@/lib/siteMeta';

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
      latitude: 39.14040,
      longitude: -121.61690,
    },
    hasMap: GOOGLE_MAPS_URL,
    areaServed: [
      'Yuba City',
      'Marysville',
      'Sutter County',
      'Olivehurst',
      'Live Oak',
      'Plumas Lake',
      'Gridley',
    ],
    founder: {
      '@type': 'Person',
      name: OWNER_NAME,
    },
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
      ratingValue: REVIEW_RATING,
      reviewCount: REVIEW_COUNT,
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [INSTAGRAM_URL, TIKTOK_URL],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SERVICES = [
  {
    name: 'Carbon IR Window Tinting',
    description:
      'HITEK Carbon IR film installation with solid heat rejection, 99% UV protection, and a lifetime warranty.',
    price: '290',
    slug: 'carbon',
  },
  {
    name: 'Ceramic IR Window Tinting',
    description:
      'HITEK Ceramic IR film with up to 75% infrared heat rejection, 99% UV protection, and a lifetime warranty.',
    price: '390',
    slug: 'ceramic',
  },
  {
    name: 'Ceramic Plus Window Tinting',
    description:
      'HITEK Ceramic Plus film with up to 90% infrared heat rejection — maximum heat rejection and clarity.',
    price: '500',
    slug: 'ceramic-plus',
  },
];

export function ServicesJsonLd() {
  const data = SERVICES.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.description,
    url: `${SITE_URL}/services#${s.slug}`,
    serviceType: 'Automotive window tinting',
    provider: { '@id': SITE_URL },
    areaServed: ['Yuba City', 'Marysville', 'Sutter County'],
    // Starting-at prices — minPrice only; an exact `price` would contradict the range.
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        minPrice: s.price,
      },
    },
  }));

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
