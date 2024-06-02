import styles from "./HeaderTop.module.css";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeartCircleMinus } from "@fortawesome/free-solid-svg-icons";

const HeaderTop = () => {
  const [pickedOption, setPickedOption] = useState("Photos");
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);
  const [isDropdownFavVisible, setIsDropdownFavVisible] = useState(false);
  const [favItemsList, setFavItemsList] = useState();
  const searchChangeHandler = (value) => {
    setInputSearchValue(value);
    if (value.length > 2) {
      setIsSearchResultVisible(true);
    } else {
      setIsSearchResultVisible(false);
    }
  };

  const setCurrentOption = (option) => {
    setPickedOption(option);
  };
  const location = useLocation();
  useEffect(() => {
    const pushToStateLocalStorageItems = () => {
      let localFavItemArray = [];
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("cloudPixel[favItem]")) {
          let localFavItem = JSON.parse(localStorage.getItem(key));
          localFavItemArray.push(localFavItem);
        }
      });
      setFavItemsList(localFavItemArray);
    };
    pushToStateLocalStorageItems();
  }, [isDropdownFavVisible]);

  const removeItemFromFav = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    localStorage.removeItem(`cloudPixel[favItem]${id}`);
    document.getElementById(id).remove();
  };

  const removeAllFavItems = () => {
    const totalItems = localStorage.length;
    const keysToRemove = [];

    for (let i = 0; i < totalItems; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("cloudPixel[favItem]")) keysToRemove.push(key);
    }
    for (const key of keysToRemove) {
      localStorage.removeItem(key);
    }
    document.querySelectorAll("[data-favItem]").forEach((item) => item.remove());
  };
  return (
    <div className={styles.headerTop}>
      <div className={styles.logo}>
        <Link to="/">Cloud Pixel</Link>
      </div>
      {(location.pathname == "/gallery" || location.pathname == "/current") && (
        <div className={styles.search}>
          <SearchBar pickedOption={pickedOption} onPickOption={setCurrentOption} onSearchChange={searchChangeHandler} />
        </div>
      )}

      <ul className={styles.nav}>
        <li className={`${styles.navItem} ${styles.fav}`}>
          <div
            onClick={() => {
              setIsDropdownFavVisible((prevState) => !prevState);
            }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </li>
        <li className={styles.navItem}>
          <a href="#">Explore</a>
        </li>
        <li className={styles.navItem}>
          <a href="#">License</a>
        </li>
        <li className={`${styles.navItem} ${styles.plus}`}>
          <a href="#">Cloud Pixel+</a>
        </li>
        {isDropdownFavVisible && (
          <div className={styles.dropdownFav}>
            <ul>
              {favItemsList.map((item) => (
                <li className={styles.favItem} data-favItem>
                  <Link
                    reloadDocument
                    to={item.url}
                    style={{ display: "block", textDecoration: "none" }}
                    id={item.id}
                    key={item.id}
                  >
                    <div className={styles.flexRow}>
                      <div className={styles.favImage}>
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className={styles.favTitle}>
                        <p>{item.title}</p>
                      </div>
                      <div className={styles.removeFav}>
                        <button onClick={(e) => removeItemFromFav(e, item.id)}>
                          <FontAwesomeIcon icon={faHeartCircleMinus} />
                        </button>
                      </div>
                    </div>
                    <div className={styles.line}></div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.clearAllFavBox}>
              <button className={styles.clearAllFavBtn} onClick={removeAllFavItems}>
                Clear all
              </button>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};
export default HeaderTop;
