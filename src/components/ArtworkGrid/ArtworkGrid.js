import React, { useEffect, useState } from "react";
import "./ArtworkGrid.css";
import { useContext } from "react";
import { ArtworksContext } from "../../contexts/ArtworksContext";
import { Link, useParams } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import ArtworkModal from "../ArtworkModal/ArtworkModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ArtworkGrid = () => {
  const params = useParams();
  const category = params.categoryName;
  const { artworks, artworksLoading } = useContext(ArtworksContext);
  const rotationExtent = 0;
  const [artworkModalDisplay, setArtworkModalDisplay] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState({});
  const [artworkThumbnails, setArtworkThumbnails] = useState({});

  const toggleArtwork = (artwork, ind) => {
    if (artwork) {
      setSelectedArtwork(artwork);
      setArtworkModalDisplay(true);
    }else {
      setSelectedArtwork({});
      setArtworkModalDisplay(false);
    }
  };

  const fetchThumbnail = async (artwork) => {
    const res = await fetch(artwork.thumbnail.url);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setArtworkThumbnails((prevThumbnails) => {
      return {
        ...prevThumbnails,
        [artwork.id]: imageObjectURL,
      };
    });
  };

  const noOfColumns = 3;
  const renderColumns = (noOfColumns) => {
    const categoryArtworks = artworks.filter((artwork_) =>
      category.includes(artwork_.category.toLocaleLowerCase())
    );

    return new Array(noOfColumns).fill(0).map((element, ind) => {
      const reqdIndicies = new Array(categoryArtworks.length)
        .fill(0)
        .reduce((result, val, ind_) => {
          if (ind_ % noOfColumns === ind) result.push(ind_);
          return result;
        }, []);

      return (
        <div className="wall">
          {reqdIndicies.map((artworkIndex) => {
            return artworkThumbnails[categoryArtworks.at(artworkIndex)?.id] ? (
              <div
                className="picture-frame"
                style={{
                  transform: `rotate(${
                    Math.random() * rotationExtent - rotationExtent / 2
                  }deg)`,
                }}
                onClick={(e) =>
                  toggleArtwork(
                    categoryArtworks.at(artworkIndex),
                    artworkIndex
                  )
                }
                onKeyDown={(e) =>
                  e.key === "Enter"
                    ? toggleArtwork(
                        categoryArtworks.at(artworkIndex),
                        artworkIndex
                      )
                    : null
                }
                tabIndex={0}
                role="Button"
                aria-label={`Open artwork named ${
                  categoryArtworks.at(artworkIndex)?.name
                }`}
              >
                <img
                  src={artworkThumbnails[categoryArtworks.at(artworkIndex).id]}
                  alt=""
                />
              </div>
            ) : (
              <Skeleton
                height={categoryArtworks.at(artworkIndex).thumbnail.height / 2}
              />
            );
          })}
        </div>
      );
    });
  };


  useEffect(() => {
    if (artworkModalDisplay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [artworkModalDisplay]);

  useEffect(() => {
    artworks.forEach((artwork) => fetchThumbnail(artwork));
  }, [artworks]);

  return (
    <div>
      <div className={artworksLoading ? "spinner-container" : ""}>
        <BarLoader loading={artworksLoading} />
      </div>
      {artworkModalDisplay && (
        <ArtworkModal
          artwork={selectedArtwork}
          toggleArtwork={toggleArtwork}
        />
      )}
      {!artworksLoading && (
        <div className="wall-container">{renderColumns(noOfColumns)}</div>
      )}
    </div>
  );
};

export default ArtworkGrid;
