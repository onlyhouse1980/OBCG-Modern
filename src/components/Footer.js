import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/WelcomePage.module.css';

const footerLinks = [
  { href: '/register', label: 'Usage Lookup' },
  { href: '/billing', label: 'Billing' },
  { href: '/pdfs/consumer2025', label: 'Water Reports' },
  { href: '/contact', label: 'Contact' },
];

export default function FooterPage() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <p className={styles.footerEyebrow}>Orchard Beach Community Group</p>
          <p className={styles.footerText}>
            Community water usage, archived records, and board resources in one
            place.
          </p>
        </div>
        <nav className={styles.footerNav} aria-label="Footer">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.footerLink}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.footerMeta}>
          <span>&copy; {new Date().getFullYear()} OBCG</span>
          <a href="https://anewshade.de" target="_blank" rel="noreferrer">
            <Image
              src="/Images/anewshade.webp"
              alt="aNewShade logo"
              height={30}
              width={40}
              className={styles.footerLogo}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
