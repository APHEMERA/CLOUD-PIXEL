import styles from "./GalleryGallery.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useReducer, useState } from "react";
import useOnScreen from "../hooks/useOnScreen";
import { useLocation } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { Link } from "react-router-dom";

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

const GalleryGallery = (props) => {
  const [stateData, dispatch] = useReducer(reducer, { state: null });
  const [page, setPage] = useState(1);

  //const { isClicked, setIsClicked } = useContext(AuthContext);
  const { value, value2 } = useContext(AuthContext);
  const [isClicked, setIsClicked] = value;
  useEffect(() => {
    dispatch({ state: null });
    setPage(1);
    fetchData();
  }, [isClicked]);

  let location = useLocation();

  const params = new URLSearchParams(location.search);
  let type = params.get("type");
  let search = params.get("search");
  if (search.length == 0) search = "Nature";
  let orientation = params.get("orientation");
  let size = params.get("size");
  let color = params.get("color");

  let url = `https://api.pexels.com/v1/search?query=${search}&page=${page}&orientation=${orientation}$size=${size}&color=${color}`;
  if (type == "videos") {
    url = `https://api.pexels.com/videos/search?query=${search}&page=${page}`;
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
      props.onGettingData(data);
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

  let firstArray = [];
  const filterFirstData = (startPos, stepPos) => {
    firstArray = [];
    if (stateData.state) {
      for (let i = startPos; i < stateData.state.length; i += stepPos) {
        firstArray.push(stateData.state[i]);
      }
    }
  };
  let secondArray = [];
  const filterSecondData = (startPos, stepPos) => {
    secondArray = [];
    if (stateData.state) {
      for (let i = startPos; i < stateData.state.length; i += stepPos) {
        secondArray.push(stateData.state[i]);
      }
    }
  };
  let thirdArray = [];
  const filterThirdData = (startPos, stepPos) => {
    thirdArray = [];
    if (stateData.state) {
      for (let i = startPos; i < stateData.state.length; i += stepPos) {
        thirdArray.push(stateData.state[i]);
      }
    }
  };
  filterFirstData(1, 3);
  filterSecondData(2, 3);
  filterThirdData(3, 3);

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

  window.addEventListener("popstate", () => {
    window.location.reload();
  });
  console.log(firstArray);
  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        {firstArray &&
          firstArray.map(
            (st) =>
              st &&
              st.photos &&
              st.photos.map((photo) => (
                <Link to={{ pathname: "/current", search: `id=${photo.id}` }} id={photo.id}>
                  <div ref={measureRef} className={styles.photo}>
                    <img src={photo.src.original} className={styles.image} />
                    {props.currentInfoVisibility && (
                      <div>
                        <div className={`${styles.photoIcons} ${styles.topIcons}`}>
                          <button className={`${styles.photoIcon}`} onClick={(e) => addItemToFav(e, photo)}>
                            <FontAwesomeIcon icon={faHeart} style={{ color: "#000" }} size="11xl" />
                          </button>
                          <button className={`${styles.photoIcon}`}>
                            <FontAwesomeIcon icon={faBookmark} style={{ color: "#000" }} size="11xl" />
                          </button>
                        </div>
                        <div className={`${styles.photoIcons} ${styles.bottomIcons}`}>
                          <button className={`${styles.photoIcon}`}>
                            <FontAwesomeIcon icon={faDownload} style={{ color: "#000" }} size="11xl" />
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
      <div className={styles.container}>
        {secondArray &&
          secondArray.map(
            (st) =>
              st &&
              st.photos &&
              st.photos.map((photo) => (
                <Link to={{ pathname: "/current", search: `id=${photo.id}` }} id={photo.id}>
                  <div className={styles.photo}>
                    <img src={photo.src.original} className={styles.image} />
                    {props.currentInfoVisibility && (
                      <div>
                        <div className={`${styles.photoIcons} ${styles.topIcons}`}>
                          <button className={`${styles.photoIcon}`}>
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
      <div className={styles.container}>
        {thirdArray &&
          thirdArray.map(
            (st) =>
              st &&
              st.photos &&
              st.photos.map((photo) => (
                <Link to={{ pathname: "/current", search: `id=${photo.id}` }} id={photo.id}>
                  <div className={styles.photo}>
                    <img src={photo.src.original} className={styles.image} />
                    {props.currentInfoVisibility && (
                      <div>
                        <div className={`${styles.photoIcons} ${styles.topIcons}`}>
                          <button className={`${styles.photoIcon}`}>
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
      <div className={styles.container}>
        {firstArray &&
          firstArray.map(
            (st) =>
              st &&
              st.videos &&
              st.videos.map((video) => (
                <div className={styles.videoItem}>
                  <a href="#" className={styles.singleResult} ref={measureRef}>
                    <video autoPlay loop muted className={styles.video}>
                      <source src={video.video_files[1].link} type="video/mp4"></source>
                    </video>
                    <div>
                      <div className={`${styles.photoIcons} ${styles.topIcons}`}>
                        <button className={`${styles.photoIcon}`}>
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
                            {video.user.url.replace("https://www.pexels.com/", "")}
                          </span>
                          <p className={styles.name}>{video.user.name}</p>
                        </a>
                      </div>
                    </div>
                  </a>
                </div>
              ))
          )}
      </div>
      <div className={styles.container}>
        {secondArray &&
          secondArray.map(
            (st) =>
              st &&
              st.videos &&
              st.videos.map((video) => (
                <div className={styles.videoItem}>
                  <a href="#" className={styles.singleResult}>
                    <video autoPlay loop muted className={styles.video}>
                      <source src={video.video_files[1].link} type="video/mp4"></source>
                    </video>
                  </a>
                </div>
              ))
          )}
      </div>
      <div className={styles.container}>
        {thirdArray &&
          thirdArray.map(
            (st) =>
              st &&
              st.videos &&
              st.videos.map((video) => (
                <div className={styles.videoItem}>
                  <a href="#" className={styles.singleResult}>
                    <video autoPlay loop muted className={styles.video}>
                      <source src={video.video_files[1].link} type="video/mp4"></source>
                    </video>
                  </a>
                </div>
              ))
          )}
      </div>
    </div>
  );
};
export default GalleryGallery;
