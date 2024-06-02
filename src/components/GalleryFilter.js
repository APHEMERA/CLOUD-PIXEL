import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { SearchBtnClickedAuthContext } from "../store/auth-context";
import styles from "./GalleryFilter.module.css";
const GalleryFilter = () => {
  const [isVisibleOrientations, setIsVisibleOrientations] = useState(false);
  const [isVisibleSize, setIsVisibleSize] = useState(false);
  const [isVisibleColors, setIsVisibleColors] = useState(false);
  const [orientation, setOrientation] = useState("All Orientations");
  const [size, setSize] = useState("All Sizes");
  const showHideOrientations = () => {
    setIsVisibleOrientations((prevState) => !prevState);
  };
  const showHideSize = () => {
    setIsVisibleSize((prevState) => !prevState);
  };
  const showColors = () => {
    setIsVisibleColors(true);
  };
  const hideColors = () => {
    setIsVisibleColors(false);
  };

  const { value, value2 } = useContext(AuthContext);
  const [isClicked, setIsClicked] = value;
  const clearGalleryGallery = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const [isBtnClicked, setIsBtnClicked] = value2;
  useEffect(() => {
    setOrientation("All Orientations");
    setSize("All Sizes");
  }, [isBtnClicked]);

  let navigate = useNavigate();
  let location = useLocation();
  const params1 = new URLSearchParams(location.search);
  useEffect(() => {
    if (params1.get("orientation")) {
      setOrientation(params1.get("orientation"));
    }
    if (params1.get("size")) {
      setSize(params1.get("size"));
    }
  }, []);
  const pushOrientationParam = (e) => {
    const params = new URLSearchParams(location.search);
    params.set("orientation", e.target.id);
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
    setIsVisibleOrientations(false);
    clearGalleryGallery();
    setOrientation(e.target.id);
  };
  const pushSizeParam = (e) => {
    const params = new URLSearchParams(location.search);
    params.set("size", e.target.id);
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
    setIsVisibleSize(false);
    clearGalleryGallery();
    setSize(e.target.id);
  };

  const pushColorParam = (e, type) => {
    const params = new URLSearchParams(location.search);
    if (type == "input") {
      params.set("color", e);
    } else {
      params.set("color", e.target.id);
    }
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
    clearGalleryGallery();
  };
  const handleKeyPress = (e) => {
    if (e.key == "Enter") pushColorParam(e.target.value, "input");
  };
  const colors = [
    { keyword: "red", hex: "ff0000" },
    { keyword: "orange", hex: "ffa500" },
    { keyword: "yellow", hex: "ffff00" },
    { keyword: "green", hex: "008000" },
    { keyword: "turquoise", hex: "40e0d0" },
    { keyword: "violet", hex: "ee82ee" },
    { keyword: "pink", hex: "ffc0cb" },
    { keyword: "brown", hex: "a52a2a" },
    { keyword: "black", hex: "000000" },
    { keyword: "gray", hex: "808080" },
  ];
  return (
    <section className={styles.filterSection}>
      <div className={styles.filterContainer}>
        <div className={styles.filterType}>
          <div className={styles.filterTypeText} onClick={showHideOrientations}>
            <span>{orientation.charAt(0).toUpperCase() + orientation.slice(1)}</span>
          </div>
          {isVisibleOrientations && (
            <div className={styles.filterOptions}>
              <ul className={styles.filterOptionsList}>
                <li className={styles.filterOption} id="all-orientations" onClick={pushOrientationParam}>
                  All Orientations
                </li>
                <li className={styles.filterOption} id="landscape" onClick={pushOrientationParam}>
                  Landscape
                </li>
                <li className={styles.filterOption} id="portrait" onClick={pushOrientationParam}>
                  Portrait
                </li>
                <li className={styles.filterOption} id="square" onClick={pushOrientationParam}>
                  Square
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className={styles.filterType}>
          <div className={styles.filterTypeText} onClick={showHideSize}>
            <span>{size.charAt(0).toUpperCase() + size.slice(1)}</span>
          </div>
          {isVisibleSize && (
            <div className={styles.filterOptions}>
              <ul className={styles.filterOptionsList}>
                <li className={styles.filterOption} id="all-sizes" onClick={pushSizeParam}>
                  All Sizes
                </li>
                <li className={styles.filterOption} id="large" onClick={pushSizeParam}>
                  Large (24MP)
                </li>
                <li className={styles.filterOption} id="medium" onClick={pushSizeParam}>
                  Medium (12MP)
                </li>
                <li className={styles.filterOption} id="small" onClick={pushSizeParam}>
                  Small (4MP)
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className={styles.filterType}>
          <div className={styles.filterTypeText}>
            #
            <input
              type="text"
              placeholder="Enter HEX code"
              maxLength="6"
              onFocus={showColors}
              onKeyDown={handleKeyPress}
            />
          </div>
          {isVisibleColors && (
            <div className={styles.filterOptions} onClick={hideColors}>
              <ul className={`${styles.filterOptionsList} ${styles.colorsContainer}`}>
                {colors.map((color) => (
                  <li className={styles.filterOption} id={`${color.hex}`} onClick={pushColorParam}>
                    <div
                      className={styles.colorBox}
                      id={`${color.hex}`}
                      style={{ backgroundColor: `${color.keyword}` }}
                    ></div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default GalleryFilter;
