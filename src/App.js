import { useEffect, useState } from "react";
import { Fragment } from "react";
import "./App.css";
import Header from "./components/Header";
import Gallery from "./components/Gallery";

function App() {
  const [stateData, setStateData] = useState([]);

  const fetchData = async () => {
    const url = "https://api.pexels.com/v1/search?query=nature";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "J1liJnBCHbUnVkVNj2G5JjgNByv1ap9OzGE95rtw7oIhg1IhA2gRLO8G",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setStateData(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Fragment>
      <Header />
      <Gallery data={stateData} />
    </Fragment>
  );
}

export default App;
