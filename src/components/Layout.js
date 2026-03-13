'use client';

import Navbar from './NavBar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">{children}</main>
      <Footer />
    </div>
  );
}
