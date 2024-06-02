import styles from "./HeaderMiddle.module.css";
import background from "../assets/Stocksy_comp_watermarked_4833033.mp4";
import { useState } from "react";
import SearchResult from "./SearchResult";
import SearchBar from "./SearchBar";
const HeaderMiddle = () => {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);

  const [pickedOption, setPickedOption] = useState("Photos");
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
          <SearchBar
            value={inputSearchValue}
            pickedOption={pickedOption}
            onPickOption={setCurrentOption}
            onSearchChange={searchChangeHandler}
          />
          {isSearchResultVisible && <SearchResult value={inputSearchValue} type={pickedOption} />}
        </div>
      </div>
    </div>
  );
};
export default HeaderMiddle;
