import styles from "./Gallery.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useReducer, useState } from "react";
import useOnScreen from "../hooks/useOnScreen";

const reducer = (prevState, action) => {
  if (action.type === "STATE_DATA") {
    if (prevState.state != null && prevState) {
      return {
        state: [...prevState.state, action.state],
      };
    } else {
      return {
        state: ["", action.state],
      };
    }
  }
  return {
    state: [],
  };
};
const Gallery = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [stateData, dispatch] = useReducer(reducer, { state: null });
  const [page, setPage] = useState(1);
  const url = `https://api.pexels.com/v1/search?query=nature&page=${page}`;
  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "J1liJnBCHbUnVkVNj2G5JjgNByv1ap9OzGE95rtw7oIhg1IhA2gRLO8G",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      console.log("data render");
      dispatch({ type: "STATE_DATA", state: data });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const { measureRef, isIntersecting, observer } = useOnScreen();

  useEffect(() => {
    if (isIntersecting) {
      setPage((prevState) => prevState + 1);
      fetchData();
      observer.disconnect();
    }
  }, [isIntersecting]);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        {stateData.state &&
          stateData.state.map(
            (st) =>
              st &&
              st.photos.map((photo) => (
                <a href="#" ref={measureRef}>
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
};
export default Gallery;
