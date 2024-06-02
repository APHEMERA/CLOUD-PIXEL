import styles from "./HomeGallery.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useReducer, useState } from "react";
import useOnScreen from "../hooks/useOnScreen";
import { Link, useLocation } from "react-router-dom";
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
const Gallery = ({ data }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [stateData, dispatch] = useReducer(reducer, { state: null });
  const [page, setPage] = useState(1);

  const location = useLocation();
  let url = `https://api.pexels.com/v1/search?query=nature&page=${page}`;
  if (location.pathname == "/current") {
    url = `https://api.pexels.com/v1/search?query=${data && data.alt}&page=${page}`;
  }
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
      dispatch({ type: "STATE_DATA", state: data });
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

  const addItemToFav = (e, data) => {
    e.stopPropagation();
    e.preventDefault();
    const url = document.getElementById(data.id).href;
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

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        {stateData.state &&
          stateData.state.map(
            (st) =>
              st &&
              st.photos.map((photo) => (
                <Link reloadDocument to={{ pathname: "/current", search: `id=${photo.id}` }} id={photo.id}>
                  <div
                    ref={measureRef}
                    className={styles.photo}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <img src={photo.src.portrait} className={styles.image} />
                    {isHovering && (
                      <div>
                        <div className={`${styles.photoIcons} ${styles.topIcons}`}>
                          <button className={`${styles.photoIcon}`} onClick={(e) => addItemToFav(e, photo)}>
                            <FontAwesomeIcon icon={faHeart} style={{ color: "#000" }} size="1xl" />
                          </button>
                          <button className={`${styles.photoIcon}`}>
                            <FontAwesomeIcon icon={faBookmark} style={{ color: "#000" }} size="1xl" />
                          </button>
                        </div>
                        <div className={`${styles.photoIcons} ${styles.bottomIcons}`}>
                          <button className={`${styles.photoIcon}`}>
                            <FontAwesomeIcon icon={faDownload} style={{ color: "#000" }} size="1xl" />
                          </button>
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
                </Link>
              ))
          )}
      </div>
    </div>
  );
};
export default Gallery;
