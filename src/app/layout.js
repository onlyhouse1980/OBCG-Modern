import '@/lib/react-compat';
import 'bootstrap-css-only/css/bootstrap.min.css';
import '../styles/globals.css';
import '../css/customcss.css';
import '../components/Marquee.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Cormorant_Garamond, Manrope } from 'next/font/google';

import Layout from '@/components/Layout';
import { Providers } from './providers';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Orchard Beach Community Group',
  description:
    'Community water usage, billing, and organizational resources for the Orchard Beach Community Group.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#071c2d',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
