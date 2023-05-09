import React, { useState, useContext } from "react";
import { ArtworksContext } from "../../contexts/ArtworksContext";
import "./Carousel.css";
import icons from "../../icons/icons";

export const Carousel = () => {
  const featuredCount = 5;
  const [openArtwork, setOpenArtwork] = useState(2);

  const { artworks } = useContext(ArtworksContext);

  const changeArtworkOnDisplay = (key, delta) => {
    setOpenArtwork((featuredCount + key + delta) % featuredCount);
  };

  return (
    <div>
      <p className="header">Featured Artworks</p>
      <div className="carousel">
        <div className="arrow">
          <img
            src={icons.leftarrow}
            className="arrow-img"
            onClick={(event) => changeArtworkOnDisplay(openArtwork, -1)}
          />
        </div>
        {artworks
          .filter((artwork_) => artwork_.featured === true)
          .map((artwork, ind) => (
            <div
              className={`artwork ${ind === openArtwork ? "open" : ""}`}
              style={{
                background: `url(${artwork.thumbnailURL})`,
                backgroundSize: "cover",
              }}
              src={artwork.thumbnailURL}
              onClick={(event) => changeArtworkOnDisplay(ind, 0)}
              key={ind}
            />
          ))}
        <div className="arrow">
          <img
            src={icons.rightarrow}
            className="arrow-img"
            onClick={(event) => changeArtworkOnDisplay(openArtwork, 1)}
          />
        </div>
      </div>
    </div>
  );
};
