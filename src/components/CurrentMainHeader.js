import styles from "./CurrentMainHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
const CurrentMainHeader = ({ data }) => {
  const addToLocalStorageItem = () => {
    const url = window.location.href;
    const id = data.id;
    const title = data.alt;
    const image = data.src.original;
    const item = {
      id: id,
      title: title,
      image: image,
      url: url,
    };
    localStorage.setItem(`cloudPixel[favItem]${id}`, JSON.stringify(item));
  };
  if (data) {
    return (
      <section className={styles.currentMainHeaderSection}>
        <div className={styles.titleBox}>
          <h1>{data.alt}</h1>
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.btnCollect}>
            <FontAwesomeIcon icon={faBookmark} />
            Collect
          </button>
          <button className={styles.btnLike} onClick={addToLocalStorageItem}>
            <FontAwesomeIcon icon={faHeart} />
            Like
          </button>
          <button className={styles.btnDownload}>
            Free Download
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
      </section>
    );
  }
};
export default CurrentMainHeader;
