'use client';

import { SDKProvider } from '@tma.js/sdk-react';

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SDKProvider acceptCustomStyles={false}>{children}</SDKProvider>;
}
