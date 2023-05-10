import React, { useState, useContext } from "react";
import { ArtworksContext } from "../../contexts/ArtworksContext";
import "./Carousel.css";
import icons from "../../icons/icons";
import BarLoader from "react-spinners/BarLoader";

export const Carousel = () => {
  const featuredCount = 5;
  const [openArtwork, setOpenArtwork] = useState(2);

  const { artworks, artworksLoading } = useContext(ArtworksContext);

  const changeArtworkOnDisplay = (key, delta) => {
    setOpenArtwork((featuredCount + key + delta) % featuredCount);
  };

  return (
    <div>
      <div className={artworksLoading ? "spinner-container" : ""}>
        <BarLoader loading={artworksLoading} />
      </div>
      {!artworksLoading && (
        <div>
          <p className="header">Featured Artworks</p>
          <div className="carousel">
            <div className="arrow">
              <img
                src={icons.leftarrow}
                className="arrow-img left"
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
                    overflow: "hidden",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                  src={artwork.thumbnailURL}
                  onClick={(event) => changeArtworkOnDisplay(ind, 0)}
                  key={ind}
                />
              ))}
            <div className="arrow">
              <img
                src={icons.rightarrow}
                className="arrow-img right"
                onClick={(event) => changeArtworkOnDisplay(openArtwork, 1)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
