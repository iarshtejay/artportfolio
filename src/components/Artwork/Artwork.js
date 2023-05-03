import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Artwork.css";
import { useContext } from "react";
import { ArtworksContext } from "../../contexts/ArtworksContext";

const Artwork = () => {
  const params = useParams();
  const artworkId = params.artworkId;

  const { artworks, artworksLoading } = useContext(ArtworksContext);

  return artworksLoading ? (
    <div className="Artwork-spinner-container">
      <div className="Artwork-spinner" />
    </div>
  ) : (
    artworks
      .filter((result) => result.id === artworkId)
      .map((artwork) => {
        console.log(artwork);
        return (
          <div className="Artwork-container">
            <img src={artwork.imageURL} width={"600em"} />
            <div className="Artwork-details-container">
              <p className="Artwork-details-primary">{artwork.name}</p>
              <p className="Artwork-details-secondary">{artwork.category}</p>
            </div>
          </div>
        );
      })
  );
};

export default Artwork;
