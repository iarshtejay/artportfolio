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

  const carouselArtworks = () => {
    return artworks
      .filter((artwork_) => artwork_.featured === true)
      .map((artwork, ind) => (
        <div
          className={`artwork ${ind === openArtwork ? "open" : ""}`}
          style={{
            background: `url(${artwork.thumbnail.url})`,
            backgroundSize: "cover",
            overflow: "hidden",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          src={artwork.thumbnailURL}
          onClick={(event) => changeArtworkOnDisplay(ind, 0)}
          key={ind}
        >
          <div className="artwork-details">
            <div className="artwork-details-primary">{artwork.name}</div>
            <div className="artwork-details-secondary">{artwork.category}</div>
          </div>
        </div>
      ));
  };

  const navigationArrows = () => {
    return [
      <div className="arrow-left">
        <img
          src={icons.leftarrow}
          className="arrow-img left"
          onClick={(event) => changeArtworkOnDisplay(openArtwork, -1)}
        />
      </div>,
      <div className="arrow-right">
        <img
          src={icons.rightarrow}
          className="arrow-img right"
          onClick={(event) => changeArtworkOnDisplay(openArtwork, 1)}
        />
      </div>,
    ];
  };

  const paginate = () => {
    return [...Array(featuredCount)].map((e, i) => (
      <div
        className={`indicator${openArtwork === i ? "-active" : ""}`}
        key={i}
        onClick={(e) => changeArtworkOnDisplay(i, 0)}
      />
    ));
  };

  return (
    <div>
      <div className={artworksLoading ? "spinner-container" : ""}>
        <BarLoader loading={artworksLoading} />
      </div>
      {!artworksLoading && (
        <div>
          <p className="header">Featured Artworks</p>
          <div className="carousel-container">
            <div className="carousel">{carouselArtworks()}</div>
            <div className="arrow-container">{navigationArrows()}</div>
          </div>
          <div className="indicator-container">{paginate()}</div>
        </div>
      )}
    </div>
  );
};
