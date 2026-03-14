'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import Navbar from './NavBar';
import Footer from './Footer';

export default function Layout({ children }) {
  const pathname = usePathname();
  const showWatermark = pathname !== '/';

  return (
    <div className="app-shell">
      {showWatermark ? (
        <div className="app-watermark" aria-hidden="true">
          <Image
            src="/Images/WebPFiles/obcglogo.webp"
            alt=""
            width={900}
            height={900}
            className="app-watermark-image"
            priority
          />
        </div>
      ) : null}
      <div className="app-frame">
        <Navbar />
        <main className="app-content">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
