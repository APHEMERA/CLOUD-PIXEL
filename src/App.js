import { useEffect, useState, useRef, useReducer } from "react";
import { Fragment } from "react";
import "./App.css";
import Header from "./components/Header";
import Gallery from "./components/Gallery";

const reducer = (prevState, action) => {
  if (action.type === "STATE_DATA") {
    if (prevState.state != null && prevState) {
      return {
        state: [...prevState.state, action.state],
      };
    } else {
      return {
        state: ["", action.state],
      };
    }
  }
  return {
    state: [],
  };
};
function App() {
  const [stateData, dispatch] = useReducer(reducer, { state: null });
  const [page, setPage] = useState(1);
  //console.log(stateData);
  const url = `https://api.pexels.com/v1/search?query=nature&page=${page}`;
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
      console.log("data render");
      dispatch({ type: "STATE_DATA", state: data });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const observerRef = useRef(null);
  console.log(observerRef.current);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const lastItem = entries[0];
      if (!lastItem.isIntersecting) return;
      observer.unobserve(lastItem.target);
      console.log(lastItem.isIntersecting);
      setPage((prevState) => prevState + 1);
      fetchData();
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
  }, [observerRef]);
  return (
    <Fragment>
      <Header />
      <Gallery data={stateData} ref={observerRef} />
    </Fragment>
  );
}

export default App;
