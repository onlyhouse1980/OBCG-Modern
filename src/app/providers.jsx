'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import { SessionProvider } from 'next-auth/react';
import { AnimatePresence } from 'framer-motion';

config.autoAddCss = false;

export function Providers({ children }) {
  return (
    <SessionProvider>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </SessionProvider>
  );
}
