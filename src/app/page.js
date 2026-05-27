import Image from 'next/image';

import {
  ActionLink,
  CardGrid,
  LinkCard,
  Page,
  Section,
} from '@/components/site/page-shell';
import { homeHighlights, miscDocuments } from '@/components/site/site-content';
import styles from '@/components/site/site-pages.module.css';

const homeCarouselImages = [
  {
    src: '/Images/WebPFiles/psound.webp',
    alt: 'Waterfront view across Pickering Passage',
  },
  {
    src: '/Images/WebPFiles/glass_droplets1.webp',
    alt: 'Water droplets close-up',
  },
  {
    src: '/Images/WebPFiles/sunrise.webp',
    alt: 'Sunrise over Orchard Beach',
  },
  {
    src: '/Images/WebPFiles/glass_droplets2.webp',
    alt: 'Water droplets close-up',
  },
  {
    src: '/Images/WebPFiles/boat.webp',
    alt: 'Boat on the water near Orchard Beach',
  },
  {
    src: '/Images/WebPFiles/glass_droplets3.webp',
    alt: 'Water droplets close-up',
  },
  {
    src: '/Images/WebPFiles/hero-bg.webp',
    alt: 'Orchard Beach shoreline',
  },
  {
    src: '/Images/WebPFiles/glass_droplets.webp',
    alt: 'Water droplets close-up',
  },
];

export default function HomePage() {
  const homeRecordLinks = [
    ...miscDocuments.slice(0, 4),
    {
      href: '/contact',
      title: 'Contact the board',
      description: 'Use the community email for questions about water usage, billing, or records.',
      meta: ['Email support'],
    },
  ];

  return (
    <Page>
      <section className={styles.homeHero}>
        <div className={styles.homeCarousel} aria-hidden="true">
          {homeCarouselImages.map((image, index) => (
            <div
              key={image.src}
              className={styles.homeSlide}
              style={{ animationDelay: `${index * 18 - 45}s` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                className={styles.homeSlideImage}
              />
            </div>
          ))}
          <div className={styles.homeCarouselShade} />
        </div>

        <div className={styles.homeHeroContent}>
          <h1 className={styles.homeTitle}>Orchard Beach Community Group</h1>
          <p className={styles.homeDescription}>
            Check meter usage, review billing information, open consumer
            confidence reports, and browse meeting minutes and community
            records.
          </p>
          <div className={styles.homeActions}>
            <ActionLink href="/register">Check water usage</ActionLink>
            <ActionLink href="/pdfs/consumer2025" secondary>
              View water reports
            </ActionLink>
          </div>
          <div className={styles.homeStats}>
            <article className={styles.homeStatCard}>
              <p className={styles.homeStatLabel}>Community established</p>
              <p className={styles.homeStatValue}>1954</p>
            </article>
            <article className={styles.homeStatCard}>
              <p className={styles.homeStatLabel}>Connections served</p>
              <p className={styles.homeStatValue}>39</p>
            </article>
            <article className={styles.homeStatCard}>
              <p className={styles.homeStatLabel}>Core focus</p>
              <p className={styles.homeStatValue}>Water system</p>
            </article>
          </div>
        </div>
      </section>

      <Section
        title="Quick access"
        description="Open the most requested water account and reporting pages from one place."
      >
        <CardGrid>
          {homeHighlights.map((item) => (
            <LinkCard
              key={item.href}
              href={item.href}
              title={item.title}
              description={item.description}
              meta={item.meta}
            />
          ))}
        </CardGrid>
      </Section>

      <Section
        title="Common records"
        description="These documents are frequently referenced for water system details, property records, and historic community files."
      >
        <CardGrid>
          {homeRecordLinks.map((document) => (
            <LinkCard
              key={document.href}
              href={document.href}
              title={document.title}
              description={document.description}
              meta={null}
              showMeta={false}
            />
          ))}
        </CardGrid>
      </Section>
    </Page>
  );
}
