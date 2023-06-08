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
  const [artwork, setCurrArtwork] = useState({});

  useEffect(() => {
    /*
      if artworks is false or an empty array 
        do nothing
      else
        find the correct artwork
    */
    if (artworks && artworks.length > 0) {
      let resultantArtwork = artworks.find((result) => result.id === artworkId);
      setCurrArtwork(resultantArtwork);
    }
  }, [artworks]);

  return artworksLoading ? (
    <div className="Artwork-spinner-container">
      <BarLoader loading={artworksLoading} />
    </div>
  ) : (
    <div>
      <div className="Artwork-container">
        <div className="aspect-ration-container">
          <img src={artwork.imageURL} className="aspect-ratio-img" />
        </div>
      </div>
      <div className="Artwork-details-flex">
        <p className="Artwork-details-primary">{artwork.name}</p>
        <p className="Artwork-details-secondary">{artwork.category}</p>
      </div>
    </div>
  );
};

export default Artwork;
