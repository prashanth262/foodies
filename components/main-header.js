import Link from 'next/link';
import Image from 'next/image';

import classes from './main-header.module.css';

import logoImg from '@/assets/logo.png';

export default function MainHeader(){


  return <header className={classes.header}>
    <Link className={classes.logo} href="/">
    <Image src={logoImg} alt="A plate with food on it" priority></Image>
    NextLevel food
    </Link>

    <nav className={classes.nav}>
      <ul>
        <li>
          <Link href="/meals" className=''>Browse Meals</Link>
        </li>
        <li>
          <Link href="/community">Foodies Community</Link>
        </li>
      </ul>
    </nav>
  </header>
}