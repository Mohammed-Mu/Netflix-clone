import React, { useEffect, useState, useRef } from "react";
import Youtube from "react-youtube";
import { imageUrl, API_KEY } from "../Constants/constants";
import axios from "../../axios";
import "./RawPost.css";

function RawPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState("");
  const postersRef = useRef(null);

  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch((err) => {
        alert("Network error");
      });
  }, [props.url]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    console.log(id);
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results[0]) {
          setUrlId(response.data.results[0]);
        } else {
          console.log("Array empty");
        }
      });
  };

  const scrollLeft = () => {
    postersRef.current.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    postersRef.current.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  // Dynamic button styles based on props.title
  const getButtonStyles = (type) => {
    const baseStyles = {
      position: "absolute",
      top: "50%",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      color: "white",
      border: "none",
      padding: "10px 20px",
      cursor: "pointer",
      zIndex: 10,
      fontSize: "18px",
      borderRadius: "5px",
      transform: "translateY(-50%)",
      opacity: 0.7,
      transition: "all 0.3s ease-in-out",
    };

    const sectionStyles = {
      "Netflix Originals": { backgroundColor: "#e50914" }, // Red for Netflix Originals
      Action: { backgroundColor: "#0074e4" }, // Blue for Action
      "Comedy Movies": { backgroundColor: "#f5c518" }, // Yellow for Comedy
    };

    const positionStyles =
      type === "left"
        ? { left: "10px" }
        : { right: "10px" }; // Position left or right based on the button type

    return { ...baseStyles, ...sectionStyles[props.title], ...positionStyles };
  };

  return (
    <div className="row" style={{ position: "relative" }}>
      <h2>{props.title}</h2>
      <button
        style={getButtonStyles("left")}
        onClick={scrollLeft}
      >
        {"<"}
      </button>
      <button
        style={getButtonStyles("right")}
        onClick={scrollRight}
      >
        {">"}
      </button>
      <div className="posters" ref={postersRef}>
        {movies.map((obj) => (
          <img
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? "smallPoster" : "poster"}
            src={`${imageUrl + obj.backdrop_path}`}
            alt="poster"
          />
        ))}
      </div>
      {urlId && <Youtube opts={opts} videoId={urlId.key} />}
    </div>
  );
}

export default RawPost;
