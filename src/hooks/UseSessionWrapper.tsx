'use client';

import { useSession } from 'next-auth/react';

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === 'loading') {
    return null;
  }

  return children;
}