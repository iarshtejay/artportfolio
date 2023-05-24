import React, { useState } from "react";
import "./ArtworkGrid.css";
import { useContext } from "react";
import { ArtworksContext } from "../../contexts/ArtworksContext";
import { Link, useParams } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import ArtworkModal from "../ArtworkModal/ArtworkModal";

const ArtworkGrid = () => {
  const params = useParams();
  const category = params.categoryName;
  const { artworks, artworksLoading } = useContext(ArtworksContext);
  const rotationExtent = 0;
  const [artworkModalDisplay, setArtworkModalDisplay] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState({});
  const displayArtwork = (artwork) => {
    setSelectedArtwork(artwork);
    setArtworkModalDisplay(true);
  };

  return (
    <div>
      <div className={artworksLoading ? "spinner-container" : ""}>
        <BarLoader loading={artworksLoading} />
      </div>
      <ArtworkModal
        artwork={selectedArtwork}
        artworkModalDisplay={artworkModalDisplay}
        setArtworkModalDisplay={setArtworkModalDisplay}
      />
      {!artworksLoading && (
        <div className="wall-container">
          <div className="wall">
            {artworks
              .filter((artwork_) =>
                category.includes(artwork_.category.toLocaleLowerCase())
              )
              .map((artwork) => {
                return (
                  // <Link to={`/artwork/${artwork.id}`}>
                  <div
                    className="picture-frame"
                    style={{
                      transform: `rotate(${
                        Math.random() * rotationExtent - rotationExtent / 2
                      }deg)`,
                    }}
                    onClick={(e) => displayArtwork(artwork)}
                  >
                    <img src={artwork.thumbnailURL} />
                  </div>
                  // </Link>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkGrid;
