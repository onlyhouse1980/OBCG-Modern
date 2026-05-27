import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import styles from '../styles/NavBar.module.css';

const NAV_ITEMS = [
  { key: "home", type: "link", label: "Home", href: "/" },
  { key: "about", type: "link", label: "About", href: "/about" },
  { key: "articles", type: "link", label: "Articles of Inc", href: "/articles" },
  { key: "executive", type: "link", label: "Executive Board", href: "/executive" },
  {
    key: "documents",
    type: "dropdown",
    label: "Documents",
    items: [
      { label: "Water Use Efficiency", href: "/pdfs/efficiency" },
      { label: "Water System Plan", href: "/pdfs/sysplan" },
      { label: "Current Bylaws", href: "/pdfs/bylaws" },
      { label: "Mason County Franchise Permit", href: "/pdfs/franchise-permit"},
      { label: "FAQs", href: "/pdfs/faqs"},
      { label: "Misc. Files", href: "/misc" },
    ],
  },
  {
    key: "consumer",
    type: "dropdown",
    label: "Consumer Confidence",
    items: [
      { label: "CCR 2024", href: "/pdfs/consumer2025" },
      { label: "CCR 2023", href: "/pdfs/consumer2024" },
      { label: "CCR 2022", href: "/pdfs/consumer2023" },
      { label: "CCR 2021", href: "/pdfs/consumer2022" },
      { label: "CCR 2020", href: "/pdfs/consumer2021" },
    ],
  },
  { key: "register", type: "link", label: "Check Usage", href: "/register" },
  {
    key: "newsletters",
    type: "dropdown",
    label: "Newsletters",
    items: [
      { label: "2.3.24", href: "/pdfs/newsletters/feb2024" },
      { label: "4.8.24", href: "/aprilnews.pdf", file: true },
      { label: "9.17.24", href: "/pdfs/newsletters/news_sep_24" },
      { label: "2.6.25", href: "/2526Newsletter.pdf", file: true },
      { label: "3.18.25", href: "/25_3_18.pdf", file: true },
    ],
  },
  {
    key: "minutes",
    type: "dropdown",
    label: "Minutes",
    items: [
      { label: "2025 Minutes", href: "/obcg25minutes.pdf", file: true },
      { label: "2024 Minutes", href: "/pdfs/2024_minutes" },
      { label: "2023 Brd. Appt.", href: "/pdfs/111323" },
      { label: "2023 Special", href: "/pdfs/sep172023min" },
      { label: "2023", href: "/pdfs/misc/minutes/2023Minutes" },
      { label: "2022", href: "/pdfs/misc/minutes/2022Minutes" },
      { label: "2021", href: "/pdfs/misc/minutes/2021Minutes" },
      { label: "2020", href: "/pdfs/misc/minutes/2020Minutes" },
      { label: "2019", href: "/pdfs/misc/minutes/2019Minutes" },
      { label: "2018", href: "/pdfs/misc/minutes/2018Minutes" },
      { label: "2017", href: "/pdfs/misc/minutes/2017Minutes" },
      { label: "2016", href: "/pdfs/misc/minutes/2016Minutes" },
      { label: "2015", href: "/pdfs/misc/minutes/2015Minutes" },
      { label: "Archive", href: "/pdfs/misc/minutes/archive/archive" },
    ],
  },
  {
    key: "community",
    type: "dropdown",
    label: "Community",
    items: [
      { label: "Mtg. with PUD 1 - May 16, 2025", href: "/videos/video" },
      { label: "Whale Videos", href: "/videos" },
      { label: "Parade", href: "/parades" },
    ],
  },
  { key: "contact", type: "link", label: "Contact", href: "/contact" },
];

const isFileLink = (href) => href.endsWith('.pdf');

const ChevronIcon = ({ className }) => (
  <svg
    className={className}
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M1.5 3.5 5 7l3.5-3.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MenuIcon = ({ open }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    {open ? (
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ) : (
      <path
        d="M3 6h14M3 10h14M3 14h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    )}
  </svg>
);

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const closeMenus = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const renderLink = (item, className) => (
    <Link
      key={item.label}
      href={item.href}
      prefetch={item.file || isFileLink(item.href) ? false : undefined}
      className={`${className} ${pathname === item.href ? styles.activeLink : ''}`}
      onClick={closeMenus}
      target={item.file ? "_blank" : undefined}
      rel={item.file ? "noreferrer" : undefined}
    >
      <span className={styles.linkLabel}>{item.label}</span>
    </Link>
  );

  return (
    <nav className={styles.navbar} aria-label="Primary">
      <Link href="/" className={styles.brand} onClick={closeMenus} aria-label="Orchard Beach Community Group — Home">
        <Image
          src="/Images/WebPFiles/obcglogo.webp"
          alt="Orchard Beach Community Group logo"
          width={52}
          height={52}
          className={styles.logo}
          priority
        />
      </Link>

      <button
        type="button"
        className={styles.toggle}
        onClick={toggleMobileMenu}
        aria-expanded={mobileOpen}
        aria-controls="primary-navigation"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        <MenuIcon open={mobileOpen} />
        <span className={styles.toggleLabel}>{mobileOpen ? 'Close' : 'Menu'}</span>
      </button>

      <div
        id="primary-navigation"
        className={`${styles.menu} ${mobileOpen ? styles.menuOpen : ""}`}
      >
        <ul className={styles.menuList}>
          {NAV_ITEMS.map((item) => {
            if (item.type === "link") {
              return (
                <li key={item.key} className={styles.menuItem}>
                  {renderLink(item, styles.link)}
                </li>
              );
            }

            const isOpen = openDropdown === item.key;
            return (
              <li
                key={item.key}
                className={`${styles.menuItem} ${isOpen ? styles.dropdownOpen : ""}`}
              >
                <div className={styles.dropdown}>
                  <button
                    type="button"
                    className={styles.dropdownTrigger}
                    onClick={() => toggleDropdown(item.key)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    <span className={styles.linkLabel}>{item.label}</span>
                    <ChevronIcon className={styles.chevron} />
                  </button>
                  <ul className={styles.dropdownList} role="menu">
                    {item.items.map((child) => (
                      <li key={`${item.key}-${child.label}`} className={styles.dropdownItem} role="none">
                        {renderLink(child, styles.dropdownItemLink)}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
