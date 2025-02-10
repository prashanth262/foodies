// 'use client';
import Link from 'next/link';
import Image from 'next/image';
// import { usePathname } from 'next/navigation';

import classes from './main-header.module.css';

import logoImg from '@/assets/logo.png';
// import { usePathname } from 'next/navigation';
import NavLink from './nav-link';

export default function MainHeader(){

  // const path=usePathname();
  return <header className={classes.header}>
    <Link className={classes.logo} href="/">
    <Image src={logoImg} alt="A plate with food on it" priority></Image>
    NextLevel food
    </Link>

    <nav className={classes.nav}>
      <ul>
        <li>
        <NavLink href="/meals">Browse /Meals </NavLink>
        </li>
        <li>
          {/* <Link href="/community" className={Path=== '/community' ? classes.active : undefined}>Foodies Community</Link> */}
          <NavLink href="/community">Foodies Community </NavLink>
        </li>
      </ul>
    </nav>
  </header>
}