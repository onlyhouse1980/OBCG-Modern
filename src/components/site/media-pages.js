'use client';

import Link from 'next/link';
import { useCallback } from 'react';

import { ActionLink, Hero, Page, Panel, Section, MediaPlayer } from '@/components/site/page-shell';

import styles from './site-pages.module.css';

function MediaPreviewCard({ item }) {
  const handlePreviewStart = useCallback((event) => {
    const video = event.currentTarget;
    video.muted = true;
    void video.play();
  }, []);

  const handlePreviewStop = useCallback((event) => {
    const video = event.currentTarget;
    video.pause();
    video.currentTime = 0;
  }, []);

  return (
    <Panel className={styles.mediaCard} title={item.title}>
      <div className={styles.mediaPreview}>
        <video
          muted
          playsInline
          preload="metadata"
          onMouseEnter={handlePreviewStart}
          onMouseLeave={handlePreviewStop}
          onFocus={handlePreviewStart}
          onBlur={handlePreviewStop}
        >
          <source src={item.src} />
        </video>
      </div>
      <p className={styles.mediaDescription}>{item.description}</p>
      {item.meta?.length ? (
        <div className={styles.mediaMeta}>
          {item.meta.map((metaItem) => (
            <span key={metaItem} className={styles.pill}>
              {metaItem}
            </span>
          ))}
        </div>
      ) : null}
      <Link href={item.href} className={styles.plainButton}>
        Open video
      </Link>
    </Panel>
  );
}

export function MediaLibraryPage({
  eyebrow,
  title,
  description,
  items,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}) {
  return (
    <Page>
      <Hero
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <>
            <ActionLink href={primaryHref}>{primaryLabel}</ActionLink>
            <ActionLink href={secondaryHref} secondary>
              {secondaryLabel}
            </ActionLink>
          </>
        }
        stats={[
          { label: 'Items', value: String(items.length) },
          { label: 'Preview style', value: 'Inline video' },
          { label: 'Archive type', value: eyebrow },
        ]}
      />

      <Section
        title="Browse the archive"
        description="Each card opens a dedicated page with a larger player."
      >
        <div className={styles.mediaGrid}>
          {items.map((item) => (
            <MediaPreviewCard key={item.href} item={item} />
          ))}
        </div>
      </Section>
    </Page>
  );
}

export function MediaItemPage({
  eyebrow,
  title,
  description,
  src,
  backHref,
  stats,
  embed = false,
}) {
  return (
    <MediaPlayer
      eyebrow={eyebrow}
      title={title}
      description={description}
      src={src}
      backHref={backHref}
      meta={stats}
      embed={embed}
      allowFullScreen={embed}
    />
  );
}
