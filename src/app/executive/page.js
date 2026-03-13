import Image from 'next/image';

import { Hero, Page, Section } from '@/components/site/page-shell';
import { boardMembers } from '@/components/site/site-content';
import styles from '@/components/site/site-pages.module.css';

export default function ExecutivePage() {
  return (
    <Page>
      <Hero
        eyebrow="Leadership"
        title="Executive board"
        description="The board supports the organization’s records, financial administration, and water-system oversight for the Orchard Beach community."
        stats={[
          { label: 'Leadership roles', value: String(boardMembers.length) },
          { label: 'Operating focus', value: 'Community water' },
          { label: 'Organization type', value: 'Volunteer board' },
        ]}
      />

      <Section
        title="Current board members"
        description="Current officers and their roles in supporting the organization."
      >
        <div className={styles.portraitGrid}>
          {boardMembers.map((member) => (
            <article key={member.name} className={styles.portraitCard}>
              <div className={styles.portraitImageWrap}>
                <Image src={member.image} alt={member.name} fill />
              </div>
              <div>
                <p className={styles.portraitRole}>{member.role}</p>
                <p className={styles.portraitName}>{member.name}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </Page>
  );
}
