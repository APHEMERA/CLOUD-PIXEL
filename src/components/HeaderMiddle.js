import styles from "./HeaderMiddle.module.css";
import background from "../assets/Stocksy_comp_watermarked_4833033.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useSyncExternalStore } from "react";
import SearchResult from "./SearchResult";
const HeaderMiddle = () => {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);
  const [showCurrentOptions, setShowCurrentOptions] = useState(false);
  const [pickedOption, setPickedOption] = useState("Photos");
  const searchChangeHandler = (e) => {
    setInputSearchValue(e.target.value);
    console.log(inputSearchValue);
    if (e.target.value.length > 2) {
      setIsSearchResultVisible(true);
    } else {
      setIsSearchResultVisible(false);
    }
  };
  const toggleShowCurrentOptionsHandler = () => {
    setShowCurrentOptions((prevState) => !prevState);
  };
  const setCurrentOption = (e) => {
    setPickedOption(e.target.value);
  };
  return (
    <div>
      <div className={styles.container}>
        <video className={styles.video} autoPlay loop muted>
          <source src={background} type="video/mp4"></source>
        </video>
        <div className={styles.parent}>
          <div className={styles.header}>
            <h1>The best free stock photos, royalty free images & videos.</h1>
          </div>
          <div className={styles.searchBarParent}>
            <div className={styles.searchBar}>
              <div className={styles.searchOptionsParent}>
                <div className={styles.searchCurrentOption} onClick={toggleShowCurrentOptionsHandler}>
                  <button>{pickedOption}</button>
                </div>
                {showCurrentOptions && (
                  <div className={styles.searchOptions}>
                    <div className={styles.searchOption}>
                      <button
                        onClick={(e) => {
                          setCurrentOption(e);
                          toggleShowCurrentOptionsHandler();
                        }}
                        value="Photos"
                      >
                        Photos
                      </button>
                    </div>
                    <div className={styles.searchOption}>
                      <button
                        onClick={(e) => {
                          setCurrentOption(e);
                          toggleShowCurrentOptionsHandler();
                        }}
                        value="Videos"
                      >
                        Videos
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <input type="text" placeholder="Search for free photos." onChange={searchChangeHandler} />
              <button className={styles.findBtn}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
          {isSearchResultVisible && <SearchResult value={inputSearchValue} type={pickedOption} />}
        </div>
      </div>
    </div>
  );
};
export default HeaderMiddle;
