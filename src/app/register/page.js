'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActionLink, Hero, Page, Panel, Section } from "@/components/site/page-shell";
import styles from "@/components/account/account-pages.module.css";

export default function Register() {
  const router = useRouter();
  const [serialNumber, setSerialNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = serialNumber.trim();
    if (!trimmed) {
      return;
    }
    router.push(`/person/${encodeURIComponent(trimmed)}`);
  };

  return (
    <Page className={styles.page}>
      <Hero
        eyebrow="Usage Lookup"
        title="Check usage by meter serial number"
        description="Enter the serial number printed on your water meter to view current usage information and recent reading history."
        actions={
          <>
            <ActionLink href="/howtoreadmeter.pdf" external>
              How to read your meter
            </ActionLink>
          </>
        }
        stats={[
          { label: 'Lookup mode', value: 'Meter serial' },
          { label: 'Result', value: 'Current estimate' },
          { label: 'Includes', value: 'Recent history' },
        ]}
      />

      <Section
        title="Open your meter page"
        description="Use digits exactly as shown on the meter. The result page compares your current reading against the latest official reading on file."
      >
        <Panel>
          <form className={styles.stack} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="serial-number" className={styles.label}>
                Meter serial number
              </label>
              <input
                id="serial-number"
                value={serialNumber}
                onChange={(event) => setSerialNumber(event.target.value)}
                placeholder="Example: 22667344"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.buttonRow}>
              <button type="submit" className={styles.button}>
                Open usage page
              </button>
            </div>
          </form>
        </Panel>
      </Section>
    </Page>
  );
}
