import React, { useState, useContext } from "react";
import { ArtworksContext } from "../../contexts/ArtworksContext";
import "./Carousel.css";

export const Carousel = () => {
  const [artworkOpen, setArtworkOpen] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const { artworks } = useContext(ArtworksContext);

  const toggleArtworkExpand = (key) => {
    setArtworkOpen((prevState) => {
      return { ...prevState, [key]: !prevState[key] };
    });
  };

  // const artworks = [
  //   { imageURL: "https://source.unsplash.com/gYl-UtwNg_I/1500x1500" },
  //   { imageURL: "https://source.unsplash.com/rFKUFzjPYiQ/1500x1500" },
  //   {
  //     imageURL:
  //       "https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&w=1500&h=1500&fit=crop&s=967e8a713a4e395260793fc8c802901d",
  //   },
  //   { imageURL: "https://source.unsplash.com/ITjiVXcwVng/1500x1500" },
  //   { imageURL: "https://source.unsplash.com/3MNzGlQM7qs/1500x1500" },
  // ];

  return (
    <div>
      <p className="header">Featured</p>
      <div className="carousel">
        {artworks.map(
          (artwork, ind) =>
            artwork.featured && (
              <div
                className={`artwork ${artworkOpen[ind] ? "open" : ""}`}
                style={{ background: `url(${artwork.imageURL})`, backgroundSize: "cover"}}
                src={artwork.imageURL}
                onClick={(event) => toggleArtworkExpand(ind)}
                key={ind}
              />
            )
        )}
      </div>
    </div>
  );
};
