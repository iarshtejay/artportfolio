import React, { useState, useContext } from "react";
import { ArtworksContext } from "../../contexts/ArtworksContext";
import "./Carousel.css";
import icons from "../../icons/icons";
import BarLoader from "react-spinners/BarLoader";

export const Carousel = () => {
  const featuredCount = 5;
  const [openArtwork, setOpenArtwork] = useState(2);
  const { artworks, artworksLoading } = useContext(ArtworksContext);

  const handleOpenArtwork = (key, delta) => {
    setOpenArtwork((featuredCount + key + delta) % featuredCount);
  };

  const renderArtworks = () => {
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
          onClick={(event) => handleOpenArtwork(ind, 0)}
          key={ind}
        >
          <div className="artwork-details">
            <div className="artwork-details-primary">{artwork.name}</div>
            <div className="artwork-details-secondary">{artwork.category}</div>
          </div>
        </div>
      ));
  };

  const renderNavArrows = () => {
    return [
      <div
        className="arrow-left"
        onClick={(event) => handleOpenArtwork(openArtwork, -1)}
        onKeyDown={(event) =>
          event.key === "Enter" ? handleOpenArtwork(openArtwork, -1) : null
        }
        aria-label="Go To Previous Image"
        role="Button"
        tabIndex={0}
      >
        <img src={icons.leftarrow} className="arrow-img left" alt="" />
      </div>,
      <div
        className="arrow-right"
        onClick={(event) => handleOpenArtwork(openArtwork, 1)}
        onKeyDown={(event) =>
          event.key === "Enter" ? handleOpenArtwork(openArtwork, 1) : null
        }
        aria-label="Go To Next Image"
        role="Button"
        tabIndex={0}
      >
        <img src={icons.rightarrow} className="arrow-img right" alt="" />
      </div>,
    ];
  };

  const renderPagination = () => {
    return [...Array(featuredCount)].map((e, i) => (
      <div
        className={`indicator${openArtwork === i ? "-active" : ""}`}
        key={i}
        onClick={(e) => handleOpenArtwork(i, 0)}
        aria-label="Click to change active image"
        role="Button"
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
            <div className="carousel">{renderArtworks()}</div>
            <div className="arrow-container">{renderNavArrows()}</div>
          </div>
          <div className="indicator-container">{renderPagination()}</div>
        </div>
      )}
    </div>
  );
};
