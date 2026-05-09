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
  { name: 'J B',                init: 'JB', color: '#1a73e8', stars: 5, date: '6 days ago',    count: '2 reviews',             text: 'I’ve taken two different cars here, an Infiniti Q60 and a Toyota Corolla Cross, and got the same great results on both. Excellent quality work, fast service, and outstanding customer service. Highly recommend!' },
  { name: 'Jeremy Procopio',    init: 'JP', color: '#d93025', stars: 5, date: '2 months ago',  count: '2 reviews · 1 photo',   text: 'Juan is awesome!! Got me in within 12 hours, my truck looks amazing and will definitely be a repeat customer.' },
  { name: 'Ofelia Viridiana',   init: 'OV', color: '#188038', stars: 5, date: '4 months ago',  count: '1 review',              text: 'I recently got my windows tinted by Juan and he did an amazing job. The price range is reasonable for the dedication he puts in his work. I have never been a fan of having fish bowl windows and the level of tint was perfect for my needs. I will be recommending him to my friends and family.' },
  { name: 'Nicole',             init: 'N',  color: '#9334e6', stars: 5, date: '5 months ago',  count: '1 review',              text: 'Recently I had a visor tint strip placed on my Dodge Charger. I love it! The work was done clean and quick at an awesome price. Recommend Juan to anyone looking for affordable quality work and friendly service!' },
  { name: 'Jose Mascorro',      init: 'JM', color: '#e8710a', stars: 5, date: '8 months ago',  count: '11 reviews',            text: 'Super super nice guy, amazing prices and fast service as well. Highly recommend him.' },
  { name: 'Martin Antonio',     init: 'MA', color: '#1a73e8', stars: 5, date: '11 months ago', count: '6 reviews',             text: 'Great service and good communication! I reached out wanting to tint my truck and Juan walked me through my options and gave me a quick quote. Great quality of work, definitely recommend his shop for all your tint needs!' },
  { name: 'Alexis Burrow',      init: 'AB', color: '#188038', stars: 5, date: '11 months ago', count: '8 reviews · 2 photos',  text: 'I was very pleased with the outcome of my window tint! Any questions I had, he was happy to answer. Very reasonable pricing! I highly recommend!' },
  { name: 'Shane',              init: 'S',  color: '#d93025', stars: 5, date: '11 months ago', count: '1 review',              text: 'Did a great job. Bringing all my vehicles that need tints to Oscuro Tintz.' },
  { name: 'Karla Aguilar',      init: 'KA', color: '#9334e6', stars: 5, date: '11 months ago', count: '5 reviews · 3 photos',  text: 'My friend recommended us to him and he did such an amazing job! My husbands car looks so good! Definitely recommend to come to him, we’ll be taking my car next.' },
  { name: 'An7h0nY T0onZ',      init: 'AT', color: '#e8710a', stars: 5, date: '11 months ago', count: '1 review',              text: 'Excellent job all around. He’s super friendly, and understandable. The process was fairly quick and the tint turned out great. Would definitely recommend!' },
  { name: 'Alex Gonzalez',      init: 'AG', color: '#1a73e8', stars: 5, date: '11 months ago', count: '7 reviews · 1 photo',   text: 'Such a respectful young man, he made sure we were satisfied with his work and offered additional follow up if something came up or needed to be fixed. We’re glad we gave him an opportunity! Keep working hard.' },
  { name: 'asvpxkaz',           init: 'A',  color: '#188038', stars: 5, date: '11 months ago', count: '2 reviews',             text: 'Listened to what customers wanted, was very clean and efficient. Love how my car turned out.' },
  { name: 'Jesus Garcia',       init: 'JG', color: '#d93025', stars: 5, date: '11 months ago', count: '1 review · 3 photos',   text: 'He is a great tinter, the service was off the chart. Would definitely recommend 10/10. He put his time and effort into his work.' },
  { name: 'Yazzy',              init: 'Y',  color: '#9334e6', stars: 5, date: '11 months ago', count: '1 review',              text: 'First time getting my car tinted and am very satisfied with his work. Very understanding and will help get you exactly what you want. Best in Yuba.' },
  { name: 'Jobany Dominguez',   init: 'JD', color: '#e8710a', stars: 5, date: '11 months ago', count: '1 review',              text: 'Tints come out good.' },
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
