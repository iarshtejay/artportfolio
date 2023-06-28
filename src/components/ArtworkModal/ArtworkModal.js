import React, { useState, useEffect, useContext } from "react";
import "./ArtworkModal.css";
import icons from "../../icons/icons";
import { ArtworksContext } from "../../contexts/ArtworksContext";

const ArtworkModal = ({
  artwork,
  category,
  setSelectedArtwork,
  setArtworkModalDisplay,
}) => {
  const [img, setImg] = useState();
  const [imgLoading, setImgLoading] = useState(true);
  const { artworks, artworksLoading } = useContext(ArtworksContext);

  const fetchImage = async (imageURL) => {
    setImgLoading(true);
    const res = await fetch(imageURL);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
    setImgLoading(false);
  };

  const handleKeyboardNav = (event) => {
    console.log(event);
  };

  useEffect(() => {
    fetchImage(artwork.imageURL);
  }, [artwork]);

  const navigateArtworks = (event) => {
    const categoryArtworks = artworks.filter((artwork_) =>
      category.includes(artwork_.category.toLocaleLowerCase())
    );
    const selectedInd = categoryArtworks.findIndex((art_) => {
      console.log("finding new index");
      console.log("selected artwork-->", artwork)
      return art_.id === artwork.id;
    });
    console.log("Selected Index-->", selectedInd);
    console.log(`Key pressed: ${event.key}`);
    if (event.key === "Escape") setArtworkModalDisplay(false);
    if (event.key === "ArrowLeft") {
      const updatedInd =
        (categoryArtworks.length + selectedInd - 1) % categoryArtworks.length;
      setSelectedArtwork(categoryArtworks.at(updatedInd));
    }
    if (event.key === "ArrowRight") {
      const updatedInd =
        (categoryArtworks.length + selectedInd + 1) % categoryArtworks.length;
      setSelectedArtwork(categoryArtworks.at(updatedInd));
    }

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
