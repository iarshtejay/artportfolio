import React, { useState, useContext } from "react";
import { ArtworksContext } from "../../contexts/ArtworksContext";
import "./Carousel.css";

export const Carousel = () => {
  const [artworkOpen, setArtworkOpen] = useState({
    0: false,
    1: false,
    2: true,
    3: false,
    4: false,
  });
  const { artworks } = useContext(ArtworksContext);

  const toggleArtworkExpand = (key) => {
    setArtworkOpen((prevState) => {
      return { ...prevState, [key]: !prevState[key] };
    });
  };

  return (
    <div>
      <p className="header">Featured Artworks</p>
      <div className="carousel">
        {artworks.map(
          (artwork, ind) =>
            artwork.featured && (
              <div
                className={`artwork ${artworkOpen[ind] ? "open" : ""}`}
                style={{
                  background: `url(${artwork.imageURL})`,
                  backgroundSize: "cover",
                }}
                src={artwork.imageURL}
                onClick={(event) => toggleArtworkExpand(ind)}
                key={ind}
              />
            )
        )}
      </div>
    </div>
  );
};
