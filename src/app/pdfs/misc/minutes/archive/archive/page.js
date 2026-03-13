import { CardGrid, Hero, LinkCard, Page, Section } from '@/components/site/page-shell';
import { archiveMinuteLinks } from '@/components/site/site-content';

export default function ArchivePage() {
  return (
    <Page>
      <Hero
        eyebrow="Minutes Archive"
        title="Archived meeting minutes"
        description="Browse older meeting minutes and historic bylaw files from the long-running Orchard Beach archive."
        stats={[
          { label: 'Archive span', value: '1974 onward' },
          { label: 'Record type', value: 'PDF archive' },
          { label: 'Access', value: 'Browse by year' },
        ]}
      />

      <Section
        title="Archive index"
        description="Select a year or special record below to open the corresponding archived PDF."
      >
        <CardGrid>
          {archiveMinuteLinks.map((item) => (
            <LinkCard key={item.href} href={item.href} title={item.title} />
          ))}
        </CardGrid>
      </Section>
    </Page>
  );
}
