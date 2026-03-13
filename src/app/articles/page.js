import { Hero, Page, Panel, Section } from '@/components/site/page-shell';
import styles from '@/components/site/site-pages.module.css';

const articles = [
  ['First', 'The name of the corporation is Orchard Beach Community Group.'],
  ['Second', 'The period of the corporation’s duration is perpetual.'],
  [
    'Third',
    'The corporation exists to maintain a community water system, support community projects, and promote the general welfare of Orchard Beach.',
  ],
  [
    'Fourth',
    'The corporation may exercise the powers necessary to carry out those purposes while remaining consistent with its 501(c)(3) qualification.',
  ],
  [
    'Fifth',
    'Corporate activities are governed by the Board of Directors and the bylaws. Three directors form a quorum, and a majority vote of that quorum makes binding decisions.',
  ],
  [
    'Sixth',
    'If the corporation is dissolved, its assets must be distributed to one or more qualifying tax-exempt recipients selected by the Board of Directors.',
  ],
  [
    'Seventh',
    'The original registered office address was filed with the Secretary of State on August 27, 1974.',
  ],
];

export default function ArticlesPage() {
  return (
    <Page>
      <Hero
        eyebrow="Corporate Record"
        title="Articles of incorporation"
        description="The core incorporation language that defines the organization, its purpose, and how it is governed."
        stats={[
          { label: 'Filed', value: 'Aug 27, 1974' },
          { label: 'Duration', value: 'Perpetual' },
          { label: 'Entity focus', value: 'Community water' },
        ]}
      />

      <Section
        title="Key articles"
        description="The original filing establishes the organization, its purpose, the board’s governing role, and what happens to assets if the corporation is dissolved."
      >
        <div className={styles.articleGrid}>
          {articles.map(([label, text]) => (
            <Panel key={label} title={label} text={text} />
          ))}
        </div>
      </Section>
    </Page>
  );
}
