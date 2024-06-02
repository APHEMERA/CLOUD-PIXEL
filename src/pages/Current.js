import { Fragment, useEffect, useState, useRef } from "react";
import GalleryHeader from "../components/GalleryHeader";
import CurrentMainHeader from "../components/CurrentMainHeader";
import CurrentMainPhotoAndInfo from "../components/CurrentMainPhotoAndInfo";
import { useLocation, useNavigate } from "react-router-dom";
import HomeGallery from "../components/HomeGallery";
const Current = () => {
  const [data, setData] = useState();
  let location = useLocation();

  const params = new URLSearchParams(location.search);
  let id = params.get("id");
  const url = `https://api.pexels.com/v1/photos/${id}`;
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
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // window.addEventListener("popstate", () => {
  //   window.location.reload();
  // });

  return (
    <Fragment>
      <GalleryHeader />
      <CurrentMainHeader data={data} />
      <CurrentMainPhotoAndInfo data={data} />
      <HomeGallery data={data} />
    </Fragment>
  );
};
export default Current;
