import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';

import { cn } from '@/lib/utils';

import styles from './page-shell.module.css';

export function Page({ className, children }) {
  return <div className={cn(styles.page, className)}>{children}</div>;
}

export function Hero({
  eyebrow,
  title,
  description,
  actions,
  stats,
  aside,
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroGrid}>
        <div className={styles.heroContent}>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          <h1 className={styles.title}>{title}</h1>
          {description ? <p className={styles.description}>{description}</p> : null}
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div>
        <div className={styles.heroAside}>
          {stats?.length ? (
            <div className={styles.statGrid}>
              {stats.map((stat) => (
                <article key={stat.label} className={styles.statCard}>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <p className={styles.statValue}>{stat.value}</p>
                </article>
              ))}
            </div>
          ) : null}
          {aside}
        </div>
      </div>
    </section>
  );
}

export function Section({ eyebrow, title, description, children }) {
  return (
    <section className={styles.section}>
      {(eyebrow || title || description) && (
        <div className={styles.sectionHeader}>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          {title ? <h2 className={styles.sectionTitle}>{title}</h2> : null}
          {description ? <p className={styles.sectionDescription}>{description}</p> : null}
        </div>
      )}
      {children}
    </section>
  );
}

export function CardGrid({ children }) {
  return <div className={styles.cardGrid}>{children}</div>;
}

export function Panel({ title, text, meta, className, children }) {
  return (
    <article className={cn(styles.panel, className)}>
      {title ? <h3 className={styles.panelTitle}>{title}</h3> : null}
      {text ? <p className={styles.panelText}>{text}</p> : null}
      {children}
      {meta?.length ? (
        <div className={styles.meta}>
          {meta.map((item) => (
            <span key={item} className={styles.pill}>
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function ActionLink({ href, children, secondary = false, external = false }) {
  const className = secondary ? styles.secondaryCta : styles.cta;
  const usePlainAnchor =
    external || String(href).startsWith('http') || String(href).startsWith('mailto:');

  if (usePlainAnchor) {
    return (
      <a
        href={href}
        className={className}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
      >
        <span>{children}</span>
        {external ? <ExternalLink size={16} /> : <ArrowUpRight size={16} />}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      <span>{children}</span>
      <ArrowUpRight size={16} />
    </Link>
  );
}

export function BackLink({ href, children = 'Back' }) {
  return (
    <Link href={href} className={styles.secondaryCta}>
      <ArrowLeft size={16} />
      <span>{children}</span>
    </Link>
  );
}

export function LinkCard({
  href,
  title,
  description,
  meta,
  external = false,
  showMeta = true,
}) {
  const usePlainAnchor =
    external || String(href).startsWith('http') || String(href).startsWith('mailto:');

  return (
    <Panel className={styles.linkCard}>
      <div className={styles.linkCardHeader}>
        <div>
          <h3 className={styles.linkLabel}>{title}</h3>
          {description ? <p className={styles.linkMeta}>{description}</p> : null}
        </div>
      </div>
      {showMeta && meta?.length ? (
        <div className={styles.meta}>
          {meta.map((item) => (
            <span key={item} className={styles.pill}>
              {item}
            </span>
          ))}
        </div>
      ) : null}
      {usePlainAnchor ? (
        <a
          href={href}
          className={styles.linkAction}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
        >
          <span>{external ? 'Open file' : 'Open link'}</span>
          {external ? <ExternalLink size={16} /> : <ArrowUpRight size={16} />}
        </a>
      ) : (
        <Link href={href} className={styles.linkAction}>
          <span>Open page</span>
          <ArrowUpRight size={16} />
        </Link>
      )}
    </Panel>
  );
}

export function DocumentViewer({
  eyebrow,
  title,
  description,
  embedUrl,
  downloadUrl,
  children,
}) {
  return (
    <Page>
      <Hero
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <>
            {downloadUrl ? (
              <ActionLink href={downloadUrl} external>
                Open original file
              </ActionLink>
            ) : null}
            <ActionLink href="/misc" secondary>
              Explore more resources
            </ActionLink>
          </>
        }
      />
      {children}
      <div className={styles.viewerShell}>
        <div className={styles.viewerFrame}>
          <iframe src={embedUrl} title={title} allowFullScreen />
        </div>
      </div>
    </Page>
  );
}

export function MediaPlayer({
  eyebrow,
  title,
  description,
  src,
  backHref,
  meta,
  allowFullScreen,
  embed = false,
}) {
  return (
    <Page>
      <Hero
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <>
            {backHref ? <BackLink href={backHref}>Back to library</BackLink> : null}
            <ActionLink href="/contact" secondary>
              Share a memory
            </ActionLink>
          </>
        }
        stats={meta}
      />
      <div className={styles.panel}>
        <div className={styles.mediaFrame}>
          {embed ? (
            <iframe
              src={src}
              title={title}
              allow={allowFullScreen ? 'autoplay; fullscreen' : 'autoplay'}
              allowFullScreen={allowFullScreen}
            />
          ) : (
            <video controls playsInline preload="metadata">
              <source src={src} />
            </video>
          )}
        </div>
      </div>
    </Page>
  );
}

export function LoadingState({ title = 'Loading', description = 'Please wait while the page loads.' }) {
  return (
    <div className={styles.emptyState}>
      <div>
        <p className={styles.emptyTitle}>{title}</p>
        <p className={styles.emptyText}>{description}</p>
      </div>
    </div>
  );
}

export function EmptyState({ title, description, action }) {
  return (
    <div className={styles.emptyState}>
      <div>
        <p className={styles.emptyTitle}>{title}</p>
        <p className={styles.emptyText}>{description}</p>
        {action ? <div className={styles.actions}>{action}</div> : null}
      </div>
    </div>
  );
}

export function DataTable({ columns, rows }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.cells.map((cell, index) => (
                <td key={`${row.id}-${columns[index]}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
