import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Artwork.css";
import { useContext } from "react";
import { ArtworksContext } from "../../contexts/ArtworksContext";
import { BarLoader } from "react-spinners";

const Artwork = () => {
  const params = useParams();
  const artworkId = params.artworkId;

  const { artworks, artworksLoading } = useContext(ArtworksContext);

  return artworksLoading ? (
    <div className="Artwork-spinner-container">
      <BarLoader loading={artworksLoading} />
    </div>
  ) : (
    artworks
      .filter((result) => result.id === artworkId)
      .map((artwork) => {
        return (
          <div className="Artwork-container">
            <div className="Aspect-ratio-box">
              <div className="Aspect-ratio-box-inside">
                <img src={artwork.imageURL} width={"800em"}/>
              </div>
            </div>
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
