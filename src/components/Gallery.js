import styles from "./Gallery.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useState, forwardRef } from "react";
const Gallery = forwardRef((props, ref) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        {props.data.state &&
          props.data.state.map(
            (st) =>
              st &&
              st.photos.map((photo) => (
                <a href="#" ref={ref}>
                  <div className={styles.photo} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    <img src={photo.src.portrait} className={styles.image} />
                    {isHovering && (
                      <div>
                        <div className={`${styles.photoIcons} ${styles.topIcons}`}>
                          <div className={`${styles.photoIcon}`}>
                            <FontAwesomeIcon icon={faHeart} style={{ color: "#000" }} size="2xl" />
                          </div>
                          <div className={`${styles.photoIcon}`}>
                            <FontAwesomeIcon icon={faBookmark} style={{ color: "#000" }} size="2xl" />
                          </div>
                        </div>
                        <div className={`${styles.photoIcons} ${styles.bottomIcons}`}>
                          <div className={`${styles.photoIcon}`}>
                            <FontAwesomeIcon icon={faDownload} style={{ color: "#000" }} size="2xl" />
                          </div>
                        </div>
                        <div className={styles.photographerInfo}>
                          <a href="#">
                            <span className={styles.nickname}>
                              {photo.photographer_url.replace("https://www.pexels.com/", "")}
                            </span>
                            <p className={styles.name}>{photo.photographer}</p>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </a>
              ))
          )}
      </div>
    </div>
  );
});
export default Gallery;
