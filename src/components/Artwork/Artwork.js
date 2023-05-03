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
        console.log(artwork)
        return (
          <div className="Artwork-item">
            <img src={artwork.thumbnailURL} width={"200em"} />
            <p>{artwork.name}</p>
            {/* TODO: Remove category later on*/}
            <p>{artwork.id}</p>
          </div>
        );
      })
  );
};

export default Artwork;
