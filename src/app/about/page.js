import { CardGrid, Hero, Page, Panel, Section } from '@/components/site/page-shell';
import styles from '@/components/site/site-pages.module.css';

export default function AboutPage() {
  return (
    <Page>
      <Hero
        eyebrow="About OBCG"
        title="A small coastal system with a long community history"
        description="The Orchard Beach water system serves a compact waterfront community in Mason County, Washington."
        stats={[
          { label: 'System type', value: 'Group A' },
          { label: 'Approx. connections', value: '39' },
          { label: 'Distribution', value: '4,300 ft' },
        ]}
      />

      <Section
        title="System overview"
        description="The Orchard Beach water system is located in the southwest quarter of the southeast quarter of Section 22, Township 21 North, Range 2 West, W.M., in Mason County, Washington."
      >
        <div className={styles.splitGrid}>
          <Panel
            title="Water sources"
            text="The system uses two 6-inch wells with capacities of roughly 10 gpm and 60 gpm. SO2 serves as the primary source, while SO1 acts as the backup and typically comes on during peak-season demand."
          />
          <Panel
            title="Distribution"
            text="Well water is pumped to eight bladder tanks and then distributed through approximately 4,300 feet of 4-inch PVC pipe across the community."
          />
        </div>
      </Section>

      <Section
        title="Site context"
        description="The service area sits along Pickering Passage in Puget Sound, with elevations ranging from roughly 30 to 65 feet."
      >
        <CardGrid>
          <Panel
            title="Waterfront setting"
            text="The coastal location shapes both the community identity and the need for reliable infrastructure, clear board records, and accessible reference documents."
          />
          <Panel
            title="Operational focus"
            text="The group manages the practical side of a community-scale system: water records, member information, meeting minutes, and usage visibility."
          />
          <Panel
            title="Member resources"
            text="A small community system works best when residents can quickly find water records, board documents, and account information."
          />
        </CardGrid>
      </Section>
    </Page>
  );
}
