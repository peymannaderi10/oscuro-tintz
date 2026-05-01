type Review = {
  name: string;
  init: string;
  color: string;
  stars: number;
  date: string;
  count: string;
  text: string;
};

const REVIEWS: Review[] = [
  { name: 'Jake Mendoza',    init: 'JM', color: '#1a73e8', stars: 5, date: '2 weeks ago',  count: '4 reviews',  text: 'Clean install, no bubbles, and the ceramic tint is a night-and-day difference on hot days. Already booked my wife’s car.' },
  { name: 'Ricardo Castillo', init: 'RC', color: '#d93025', stars: 5, date: 'a month ago',  count: '12 reviews · 3 photos', text: 'Best tint shop in Yuba City, hands down. Fair pricing, clean work, and he actually cares about getting it right. Highly recommend.' },
  { name: 'Tyler Patton',     init: 'TP', color: '#188038', stars: 5, date: '3 weeks ago',  count: '8 reviews',  text: 'Mobile service was clutch. Came to my house, knocked it out in a few hours, and my truck looks incredible. Professional from start to finish.' },
  { name: 'Ashley Nguyen',    init: 'AN', color: '#9334e6', stars: 5, date: '5 days ago',   count: '21 reviews · 5 photos', text: 'Took my Tesla in for ceramic and the difference is unreal. AC actually keeps up now. Owner walked me through every option.' },
  { name: 'Marcus Reed',      init: 'MR', color: '#e8710a', stars: 5, date: '2 months ago', count: '6 reviews',  text: 'Got my F-150 done. Crew was professional, didn’t rush the job, and the lifetime warranty sealed it. Already sent two friends.' },
  { name: 'Diana Ortiz',      init: 'DO', color: '#1a73e8', stars: 5, date: 'a week ago',   count: '15 reviews', text: 'Came in for a removal and re-tint after a bad install elsewhere. Night and day difference. Will never go anywhere else.' },
  { name: 'Brandon Lee',      init: 'BL', color: '#188038', stars: 5, date: '3 weeks ago',  count: '9 reviews · 2 photos',  text: 'Quoted me fair, did the job in under 3 hours, and walked me through care. The Hitek film looks insane on my Civic.' },
  { name: 'Jenna Cruz',       init: 'JC', color: '#d93025', stars: 5, date: 'a month ago',  count: '7 reviews',  text: 'Friendly, on time, and the shop is clean. They text reminders before the appointment which I appreciated. Tint looks perfect.' },
  { name: 'Anthony Park',     init: 'AP', color: '#9334e6', stars: 5, date: '4 weeks ago',  count: '11 reviews', text: 'Wanted carbon for my Mustang and they nailed the shade match across all windows. No purple, no fading, just clean dark glass.' },
  { name: 'Samantha Rivera',  init: 'SR', color: '#e8710a', stars: 5, date: '6 days ago',   count: '3 reviews',  text: 'First time getting tint and they made it easy. Explained the percentages, showed me samples on the car, and didn’t upsell.' },
  { name: 'Kevin Tran',       init: 'KT', color: '#1a73e8', stars: 5, date: '2 weeks ago',  count: '18 reviews · 4 photos', text: 'Finally a shop that doesn’t cut corners. Edges are razor clean, no light gaps. Worth every dollar for the ceramic upgrade.' },
  { name: 'Carla Boyd',       init: 'CB', color: '#188038', stars: 5, date: 'a month ago',  count: '5 reviews',  text: 'Mobile install at my work parking lot. Done before lunch was over. The owner is genuinely good at what he does.' },
  { name: 'David Morales',    init: 'DM', color: '#d93025', stars: 5, date: '5 weeks ago',  count: '14 reviews', text: 'I’ve had three cars tinted here over the last few years. Quality has been consistent every single time. They earned a customer for life.' },
  { name: 'Priya Singh',      init: 'PS', color: '#9334e6', stars: 5, date: '2 weeks ago',  count: '10 reviews · 1 photo', text: 'Loved that they had real samples to hold up to the glass. Picked the perfect shade and it looks better than I imagined.' },
  { name: 'Eric Vasquez',     init: 'EV', color: '#e8710a', stars: 5, date: '3 days ago',   count: '6 reviews',  text: 'Got the windshield ceramic done. Massive difference in heat, no glare, and you can’t even tell it’s tinted from the outside. Insane work.' },
];

const STAR = '★';
const stars = (n: number) => STAR.repeat(n);

function GoogleSvg() {
  return (
    <svg className="greview__google" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18a10.99 10.99 0 0 0 0 9.86l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function Card({ r, k }: { r: Review; k: string }) {
  return (
    <article className="greview" key={k}>
      <div className="greview__head">
        <div className="greview__avatar" style={{ background: r.color }}>
          {r.init}
        </div>
        <div className="greview__name-wrap">
          <div className="greview__name">{r.name}</div>
          <div className="greview__count">{r.count}</div>
        </div>
        <GoogleSvg />
      </div>
      <div className="greview__rating">
        <span className="greview__stars">{stars(r.stars)}</span>
        <span className="greview__date">{r.date}</span>
      </div>
      <p className="greview__text">{r.text}</p>
    </article>
  );
}

export function HomeReviews() {
  const row1 = REVIEWS.slice(0, 5);
  const row2 = REVIEWS.slice(5, 10);
  const row3 = REVIEWS.slice(10, 15);

  return (
    <div className="review-rows reveal">
      <div className="review-row">
        <div className="review-row__track" id="reviewRow1">
          {[...row1, ...row1].map((r, i) => (
            <Card r={r} k={`r1-${i}`} key={`r1-${i}`} />
          ))}
        </div>
      </div>
      <div className="review-row review-row--reverse review-row--medium">
        <div className="review-row__track" id="reviewRow2">
          {[...row2, ...row2].map((r, i) => (
            <Card r={r} k={`r2-${i}`} key={`r2-${i}`} />
          ))}
        </div>
      </div>
      <div className="review-row review-row--fast">
        <div className="review-row__track" id="reviewRow3">
          {[...row3, ...row3].map((r, i) => (
            <Card r={r} k={`r3-${i}`} key={`r3-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
