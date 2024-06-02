import { Fragment, useState } from "react";
import GalleryHeader from "../components/GalleryHeader";
import GalleryFilter from "../components/GalleryFilter";
import GalleryUnderHeader from "../components/GalleryUnderHeader";
import GalleryGallery from "../components/GalleryGallery";
const Gallery = () => {
  const [currentInfoVisibility, setCurrentInfoVisibility] = useState();
  const [data, setData] = useState();
  const getData = (props) => {
    setData(props);
  };
  const getCurrentInfoVisibilityState = (props) => {
    setCurrentInfoVisibility(props);
  };
  return (
    <Fragment>
      <GalleryHeader />
      <GalleryUnderHeader data={data} getCurrentInfoVisibilityState={getCurrentInfoVisibilityState} />
      <GalleryFilter />
      <GalleryGallery onGettingData={getData} currentInfoVisibility={currentInfoVisibility} />
    </Fragment>
  );
};
export default Gallery;
