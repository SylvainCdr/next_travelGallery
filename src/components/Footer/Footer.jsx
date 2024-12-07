import styles from "./style.module.scss";
import Link from "next/link";

function Footer() {
  return (
    <div className={styles["footer-container"]}>
      <div className={styles["section-1"]}>
        <img src="/assets/hph-logo.png" alt="Logo hot product hunt" />
        <p className={styles.slogan}>ePN</p>
        <p className={styles.description}></p>
      </div>
      {/* <div className={styles["section-2"]}>
        <img className={styles.mase} src="/assets/icons/mase.png" alt="Logo MASE" loading="lazy" />
      </div> */}
      <div className={styles["section-3"]}>
        <h4>Plan de site </h4>
        <ul>
          <Link href="/">
            <li>Accueil</li>
          </Link>
          <Link href="/about">
            <li>A Propos</li>
          </Link>
        </ul>
      </div>

      <div className={styles["section-3"]}>
        <h4>Contact</h4>
        {/* <ul>
          <li>
            <i className="fa-solid fa-phone"></i>(+33) 1 39 60 98 82
          </li>
          <li>
            <i className="fa-solid fa-location-dot"></i> 38 Rue Jean Mermoz,
            78600 Maisons-Laffitte
          </li>
          <li>
            <i className="fa-brands fa-linkedin"></i>
            <Link href="https://www.linkedin.com/company/divinititech/">
              Linkedin
            </Link>
          </li>
          <p className={styles.copyright}>ePN</p>
        </ul> */}
      </div>
    </div>
  );
}

export default Footer;
