import React, { useEffect, useState } from "react";
import "./ArtworkGrid.css";
import airtableClient from "../../lib/airtable";

const ArtworkGrid = () => {
  const currentPath = window.location.pathname;
  const [artworks, setArtworks] = useState([]);
  const [artworksLoading, setArtworksLoading] = useState(true);

  useEffect(() => {
    const onPageLoad = () => {
      console.log(process.env.REACT_APP_AIRTABLE_API_TOKEN);
      airtableClient
        .get("/")
        .then((res) => {
          const records = res.data.records.map((record) => {
            return {
              id: record.id,
              name: record.fields.name,
              category: record.fields.category,
              imageURL: record.fields.image[0].thumbnails.large.url,
            };
          });
          setArtworks(records);
          setArtworksLoading(false);
        })
        .catch((err) => {
          setArtworksLoading(false);
          console.log(err);
        });
    };
    onPageLoad();
  }, []);

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
