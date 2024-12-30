import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const linkedin = "https://www.linkedin.com/company/divinititech";

  return (
  
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>
          <Link href="/">
            <img
              src="/assets/logo.jpg"
              alt="photo gallery home"
             
            />
          </Link>
        </div>
        <ul className={styles.headerLinks}>
          <li>
            <Link href="/albums">Albums</Link>
          </li>
         
          <li>
            <Link href="/about-us">A Propos</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
           {/* 
          <li>
            <Link href="/v4">V4</Link>
          </li>
          <li>
            <Link href="/v5">V5</Link>
          </li>
          <li>
            <Link href="/about">À propos</Link>
          </li>
          <li>
            <Link href="/team">L'équipe</Link>
          </li> */}
<li>
      
          </li>
        </ul>
      </div>
   
  );
}
