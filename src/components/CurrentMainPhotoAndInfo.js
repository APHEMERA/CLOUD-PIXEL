import styles from "./CurrentMainPhotoAndInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
const CurrentMainPhotoAndInfo = ({ data }) => {
  if (data) {
    return (
      <section>
        <div className={styles.currentMainPhoto}>
          <img src={data.src.original}></img>
        </div>
        <div className={styles.underPhotoContent}>
          <div className={styles.authorInfo}>
            <h3>{data.photographer}</h3>
            <p>{data.photographer_url.replace("https://www.pexels.com/", "")}</p>
          </div>
          <div className={styles.buttonsContainer}>
            <button className={styles.btnShare}>
              <FontAwesomeIcon icon={faShareFromSquare} />
              Share
            </button>
            <button className={styles.btnFlag}>
              <FontAwesomeIcon icon={faFlag} />
            </button>
          </div>
        </div>
        <div className={styles.similarContainer}>
          <p className={styles.similarText}>Similar photos</p>
        </div>
      </section>
    );
  }
};
export default CurrentMainPhotoAndInfo;
