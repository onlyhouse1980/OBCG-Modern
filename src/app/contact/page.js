import Image from 'next/image';

import { ActionLink, CardGrid, Hero, Page, Panel, Section } from '@/components/site/page-shell';
import styles from '@/components/site/site-pages.module.css';

export default function ContactPage() {
  const email = 'orchardwater@yahoo.com';

  return (
    <Page>
      <Hero
        eyebrow="Contact"
        title="Reach the Orchard Beach Community Group"
        description="Use the shared community email for questions about water usage, records, reports, or general member communication."
        actions={
          <>
            <ActionLink href={`mailto:${email}?subject=OBCG%20Member%20Email`}>
              Email OBCG
            </ActionLink>
            <ActionLink href="/pdfs/faq" secondary>
              Open FAQs
            </ActionLink>
          </>
        }
        stats={[
          { label: 'Community established', value: '1954' },
          { label: 'Primary contact', value: 'Email' },
          { label: 'Location', value: 'Grapeview, WA' },
        ]}
      />

      <Section
        title="Contact details"
        description="The board and community administrators can route requests more quickly when messages include the account last name or meter number."
      >
        <CardGrid>
          <Panel>
            <div className={styles.contactInfo}>
              <p className={styles.contactLabel}>Organization</p>
              <p className={styles.contactValue}>Orchard Beach Community Group</p>
              <p className={styles.contactNote}>Community water system and organizational records.</p>
            </div>
          </Panel>
          <Panel>
            <div className={styles.contactInfo}>
              <p className={styles.contactLabel}>Email</p>
              <p className={styles.contactValue}>{email}</p>
              <p className={styles.contactNote}>Include your last name, meter number, or document question when possible.</p>
            </div>
          </Panel>
          <Panel>
            <div className={styles.contactInfo}>
              <p className={styles.contactLabel}>Location</p>
              <p className={styles.contactValue}>Orchard Beach, Grapeview, WA 98546</p>
              <p className={styles.contactNote}>Pickering Passage community shoreline in Mason County, Washington.</p>
            </div>
          </Panel>
        </CardGrid>
      </Section>

      <Section
        title="Community map"
        description="A schematic view of the Orchard Beach area for general orientation."
      >
        <div className={styles.mapFrame}>
          <Image
            src="/Images/WebPFiles/fullsmall.webp"
            alt="Schematic map of Orchard Beach"
            fill
            priority
          />
        </div>
      </Section>
    </Page>
  );
}
