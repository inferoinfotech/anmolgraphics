'use client';

import { usePathname } from 'next/navigation';

export default function MainWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname && pathname.startsWith('/admin');

  return (
    <main className={isAdmin ? '' : 'pt-20'}>
      {children}
    </main>
  );
}
