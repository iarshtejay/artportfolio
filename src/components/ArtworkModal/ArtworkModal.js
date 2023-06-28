import React, { useState, useEffect, useContext } from "react";
import "./ArtworkModal.css";
import icons from "../../icons/icons";

const ArtworkModal = ({
  artwork,
  setArtworkModalDisplay,
}) => {
  const [img, setImg] = useState();
  const [imgLoading, setImgLoading] = useState(true);

  const fetchImage = async (imageURL) => {
    setImgLoading(true);
    const res = await fetch(imageURL);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
    setImgLoading(false);
  };

  useEffect(() => {
    fetchImage(artwork.imageURL);
  }, [artwork]);

  const navigateArtworks = (event) => {
    if (event.key === "Escape") setArtworkModalDisplay(false);
  }

  useEffect(() => {
    document.addEventListener("keydown", event => navigateArtworks(event));
    // Runs on component un-mount
    return () => {
      document.removeEventListener("keydown", event => navigateArtworks(event));
    };
  }, []);

  return (
    <div
      className="Artwork-modal-container"
      onClick={(e) => setArtworkModalDisplay(false)}
    >
      <div className="Artwork-modal">
        <div className="aspect-ratio-container">
          {!imgLoading && img && <img src={img} className="aspect-ratio-img" />}
        </div>
      </div>
      <div className="Artwork-modal-details">
        <p className="Artwork-modal-details-primary">{artwork.name}</p>
        <p className="Artwork-modal-details-secondary">{artwork.category}</p>
      </div>
      <img
        className="Artwork-modal-close"
        src={icons.close}
        onClick={(e) => setArtworkModalDisplay(false)}
        alt="close"
      />
    </div>
  );
};

export default ArtworkModal;
