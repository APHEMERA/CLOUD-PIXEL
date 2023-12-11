import styles from "./SearchResult.module.css";
import { useState, useEffect } from "react";
const SearchResult = (props) => {
  const [stateData, setStateData] = useState([]);
  const [isZeroResults, setIsZeroResults] = useState(false);

  const fetchData = async () => {
    let url = `https://api.pexels.com/v1/search?query=${props.value}&orientation=square`;
    if (props.type == "Videos") {
      url = `https://api.pexels.com/videos/search?query=${props.value}&orientation=square`;
    }
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "J1liJnBCHbUnVkVNj2G5JjgNByv1ap9OzGE95rtw7oIhg1IhA2gRLO8G",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      if (data.total_results == 0) {
        setIsZeroResults(true);
      } else {
        setIsZeroResults(false);
      }
      setStateData(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [props.value, props.type]);
  console.log(stateData, props.value);

  return (
    <div className={styles.searchResultParent}>
      <span className={styles.total}>
        {stateData.total_results} {props.type} found
      </span>
      <div className={styles.searchResult}>
        {stateData.photos &&
          stateData.photos.map((photo) => (
            <a href="#" className={styles.singleResult}>
              <img src={photo.src.small} />
            </a>
          ))}
        {stateData.videos &&
          stateData.videos.map((video) => (
            <a href="#" className={styles.singleResult}>
              <video autoPlay loop muted className={styles.video}>
                <source src={video.video_files[1].link} type="video/mp4"></source>
              </video>
            </a>
          ))}
        {isZeroResults && <div className={styles.alert}>There is no {props.type} found.</div>}
      </div>
    </div>
  );
};
export default SearchResult;
