import React, { useEffect, useState } from "react";
import "./ArtworkGrid.css";
import airtableClient from "../../lib/airtable";
import { useContext } from "react";
import { ArtworksContext } from "../../contexts/ArtworksContext";

const ArtworkGrid = () => {
  const currentPath = window.location.pathname;
  const { artworks, artworksLoading } = useContext(ArtworksContext);
  console.log("In Artwork Griddd")

  return artworksLoading ? (
    <div className="ArtworkGrid-spinner-container">
      <div className="ArtworkGrid-spinner" />
    </div>
  ) : (
    <div className="ArtworkGrid-container">
      {artworks
        .filter((artwork_) =>
          currentPath.includes(artwork_.category.toLocaleLowerCase())
        )
        .map((artwork) => {
          return (
            <div className="ArtworkGrid-item">
              <img src={artwork.imageURL} width={"200em"} />
              <p>{artwork.name}</p>
              {/* TODO: Remove category later on*/}
              <p>{artwork.category}</p>
            </div>
          );
        })}
    </div>
  );
};

export default ArtworkGrid;