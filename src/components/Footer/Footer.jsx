import styles from "./style.module.scss";
import Link from "next/link";

function Footer() {
  return (
    <div className={styles["footer-container"]}>
      <div className={styles["section-1"]}>
        <img src="/assets/logo.jpg" alt="logo home" />
        <p className={styles.slogan}>Sly's Adventure Gallery</p>
        <p className={styles.description}></p>
      </div>
      {/* <div className={styles["section-2"]}>
        <img className={styles.mase} src="/assets/icons/mase.png" alt="Logo MASE" loading="lazy" />
      </div> */}
      <div className={styles["section-3"]}>
        <h4>Sitemap </h4>
        <ul>
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/albums">
            <li>Travel Albums</li>
          </Link>
          <Link href="/albums/72177720323101492">
            <li>Nature & Animals</li>
          </Link>
        </ul>

        
        <p className={styles.copyright}>© 2024 Sly's Adventure Gallery. All rights reserved.</p>
      </div>

    </div>
  );
}

export default Footer;
