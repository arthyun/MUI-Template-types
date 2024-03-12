'use client';
import React from 'react';
import Link from 'next/link';
import styles from '@/styles/navigation.module.css';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href='/'>Home</Link>
          {pathname === '/' ? ' 💥' : ''}
        </li>
        <li>
          <Link href='/about-us'>About Us</Link>
          {pathname === '/about-us' ? ' 💥' : ''}
        </li>
      </ul>
    </nav>
  );
}
