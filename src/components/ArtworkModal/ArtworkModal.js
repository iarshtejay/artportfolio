import React, { Suspense } from "react";
import "./ArtworkModal.css";
import icons from "../../icons/icons";

const ArtworkModal = ({
  artwork,
  artworkModalDisplay,
  setArtworkModalDisplay,
}) => {
  const preloadIimage = (im_url) => {
    let img = new Image();
    img.src = im_url;
    img.className = "aspect-ratio-img";
    console.log(img);
    return img;
  };
  console.log("In artwork modal");
  return (
    artworkModalDisplay && (
      <div
        className="Artwork-modal-container"
        onClick={(e) => setArtworkModalDisplay(false)}
      >
        <div className="Artwork-modal">
          <div className="aspect-ratio-container">
            {/* {preloadIimage(artwork.imageURL).map((element) => element)} */}
            <img src={artwork.imageURL} className="aspect-ratio-img" />
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
