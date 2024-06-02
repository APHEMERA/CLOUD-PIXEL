import { useLocation } from "react-router-dom";
import styles from "./GalleryUnderHeader.module.css";
import { useState } from "react";

const GalleryUnderHeader = ({ data, getCurrentInfoVisibilityState }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(true);
  let totalResults = data && data.total_results;
  let location = useLocation();
  const params = new URLSearchParams(location.search);

  let type = params.get("type");
  let search = params.get("search");
  if (search.length == 0) search = "Nature";
  type = type[0].toUpperCase() + type.slice(1);
  search = search[0].toUpperCase() + search.slice(1);

  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K"
      : Math.sign(num) * Math.abs(num);
  };
  const showHideInfoOfImage = () => {
    setIsInfoVisible(!isInfoVisible);
    getCurrentInfoVisibilityState(isInfoVisible);
  };
  return (
    <div className={styles.underheaderContainer}>
      <div>
        <h1 className={styles.underheaderH1}>
          Free {search} {type} ({kFormatter(totalResults)})
        </h1>
      </div>
      <div>
        <button className={styles.underheaderBtn} onClick={showHideInfoOfImage}>
          {!isInfoVisible ? "Hide" : "Show"} Photo Info
        </button>
      </div>
    </div>
  );
};
export default GalleryUnderHeader;
