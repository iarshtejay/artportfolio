import React from "react";
import "./ArtworkGrid.css";
import { useContext } from "react";
import { ArtworksContext } from "../../contexts/ArtworksContext";
import { Link, useParams } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

const ArtworkGrid = () => {
  const params = useParams();
  const category = params.categoryName;
  const { artworks, artworksLoading } = useContext(ArtworksContext);

  return (
    <div>
      <div className={artworksLoading ? "spinner-container" : ""}>
        <BarLoader loading={artworksLoading} />
      </div>
      {!artworksLoading && (
        <div className="ArtworkGrid-container">
          {artworks
            .filter((artwork_) =>
              category.includes(artwork_.category.toLocaleLowerCase())
            )
            .map((artwork) => {
              return (
                <Link to={`/artwork/${artwork.id}`}>
                  <div className="ArtworkGrid-item">
                    <div className="Aspect-ratio-box">
                      <div className="Aspect-ratio-box-inside">
                        <img src={artwork.thumbnailURL} width={"300em"} />
                      </div>
                    </div>
                    <div className="Artwork-details-container">
                      <p className="Artwork-details-primary">{artwork.name}</p>
                      <p className="Artwork-details-secondary">
                        {artwork.category}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ArtworkGrid;
