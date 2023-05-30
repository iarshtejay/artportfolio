import React, { useState, useEffect } from "react";
import "./ArtworkModal.css";
import icons from "../../icons/icons";

const ArtworkModal = ({
  artwork,
  artworkModalDisplay,
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

  return (
    artworkModalDisplay && (
      <div
        className="Artwork-modal-container"
        onClick={(e) => setArtworkModalDisplay(false)}
      >
        <div className="Artwork-modal">
          <div className="aspect-ratio-container">
            {!imgLoading && img && (
              <img src={img} className="aspect-ratio-img" />
            )}
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
    )
  );
};

export default ArtworkModal;
