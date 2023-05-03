import React from "react";
import "./ArtworkGrid.css";
import { useContext } from "react";
import { ArtworksContext } from "../../contexts/ArtworksContext";
import { Link, useParams } from "react-router-dom";

const ArtworkGrid = () => {
  const params = useParams();
  const category = params.categoryName;
  const { artworks, artworksLoading } = useContext(ArtworksContext);

  return artworksLoading ? (
    <div className="ArtworkGrid-spinner-container">
      <div className="ArtworkGrid-spinner" />
    </div>
  ) : (
    <div className="ArtworkGrid-container">
      {artworks
        .filter((artwork_) =>
          category.includes(artwork_.category.toLocaleLowerCase())
        )
        .map((artwork) => {
          return (
            <Link to={`/artwork/${artwork.id}`}>
              <div className="ArtworkGrid-item">
                <img src={artwork.thumbnailURL} width={"200em"} />
                <p>{artwork.name}</p>
                {/* TODO: Remove category later on*/}
                <p>{artwork.category}</p>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default ArtworkGrid;
