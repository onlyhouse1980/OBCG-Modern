'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import { SessionProvider } from 'next-auth/react';

config.autoAddCss = false;

export function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
