import styles from "./HeaderTop.module.css";
const HeaderTop = () => {
  return (
    <div className={styles.headerTop}>
      <div className={styles.logo}>
        <a href="#">Cloud Pixel</a>
      </div>
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <a href="#">Explore</a>
        </li>
        <li className={styles.navItem}>
          <a href="#">License</a>
        </li>
        <li className={`${styles.navItem} ${styles.plus}`}>
          <a href="#">Cloud Pixel+</a>
        </li>
      </ul>
    </div>
  );
};
export default HeaderTop;
