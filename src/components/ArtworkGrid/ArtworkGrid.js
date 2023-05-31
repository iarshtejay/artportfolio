import React, { useEffect, useState } from "react";
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
  const [artworkThumbnails, setArtworkThumbnails] = useState({});

  const displayArtwork = (artwork) => {
    setSelectedArtwork(artwork);
    setArtworkModalDisplay(true);
  };

  const fetchThumbnail = async (artwork) => {
    const res = await fetch(artwork.thumbnail.url);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setArtworkThumbnails(prevThumbnails => {
      return {
        ...prevThumbnails,
        [artwork.id]: imageObjectURL,
      };
    });
  };

  useEffect(() => {
    artworks.forEach((artwork) => fetchThumbnail(artwork));
  }, [artworks]);

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
                    {artworkThumbnails[artwork?.id] ? (
                      <img src={artworkThumbnails[artwork.id]} />
                    ) : (
                      <img width={artwork.thumbnail.width/2} height={artwork.thumbnail.height/2}/>
                    )}
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
