import styles from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";
const SearchBar = (props) => {
  const [showCurrentOptions, setShowCurrentOptions] = useState(false);
  const [pickedOption, setPickedOption] = useState("photos");
  const [valuee, setValue] = useState("");
  const toggleShowCurrentOptionsHandler = () => {
    setShowCurrentOptions((prevState) => !prevState);
  };
  const setCurrentOption = (e) => {
    props.onPickOption(e.target.value);
    setPickedOption(e.target.value.toLowerCase());
  };
  const searchChangeHandler = (e) => {
    props.onSearchChange(e.target.value);
    setValue(e.target.value);
  };
  // const { isClicked, setIsClicked } = useContext(AuthContext);
  const { value, value2 } = useContext(AuthContext);
  const [isClicked, setIsClicked] = value;
  const clearGalleryGallery = () => {
    console.log(valuee.length > 0);
    if (valuee.length == 0) setValue("Nature");
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };
  const [isBtnClicked, setIsBtnClicked] = value2;
  const clearFilterOptions = () => {
    setIsBtnClicked(true);
    setTimeout(() => {
      setIsBtnClicked(false);
    }, 200);
  };
  return (
    <div className={styles.searchBarParent}>
      <div className={styles.searchBar}>
        <div className={styles.searchOptionsParent}>
          <div className={styles.searchCurrentOption} onClick={toggleShowCurrentOptionsHandler}>
            <button>{props.pickedOption}</button>
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
        <Link
          to={{ pathname: "/gallery", search: `type=${pickedOption}&search=${valuee}` }}
          onClick={() => {
            clearGalleryGallery();
            clearFilterOptions();
          }}
          className={styles.findBtn}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};
export default SearchBar;
