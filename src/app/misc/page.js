import { CardGrid, Hero, LinkCard, Page, Section } from '@/components/site/page-shell';
import { miscDocuments } from '@/components/site/site-content';

export default function MiscPage() {
  return (
    <Page>
      <Hero
        eyebrow="Historical Files"
        title="Historical documents"
        description="These records support the long-term history of the Orchard Beach water system and the broader community organization."
        stats={[
          { label: 'Archive type', value: 'Reference docs' },
          { label: 'Use case', value: 'Historical context' },
          { label: 'Access', value: 'Open to all' },
        ]}
      />

      <Section
        title="Document collection"
        description="Open historic maps, legal records, project files, and assorted supporting materials."
      >
        <CardGrid>
          {miscDocuments.map((document) => (
            <LinkCard
              key={document.href}
              href={document.href}
              title={document.title}
              description={document.description}
            />
          ))}
        </CardGrid>
      </Section>
    </Page>
  );
}
