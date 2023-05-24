import React from "react";
import "./ArtworkGrid.css";
import { useContext } from "react";
import { ArtworksContext } from "../../contexts/ArtworksContext";
import { Link, useParams } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

const ArtworkGrid = () => {
  const params = useParams();
  const category = params.categoryName;
  const { artworks, artworksLoading } = useContext(ArtworksContext);
  const rotationExtent = 0;

  return (
    <div>
      <div className={artworksLoading ? "spinner-container" : ""}>
        <BarLoader loading={artworksLoading} />
      </div>
      {!artworksLoading && (
        // <div className="ArtworkGrid-container">
        //   {artworks
        //     .filter((artwork_) =>
        //       category.includes(artwork_.category.toLocaleLowerCase())
        //     )
        //     .map((artwork) => {
        //       return (
        //         <Link to={`/artwork/${artwork.id}`}>
        //           {/* <div className="ArtworkGrid-item"> */}
        //           <div className="Aspect-ratio-box">
        //             <div className="Aspect-ratio-box-inside">
        //               <img
        //                 src={artwork.thumbnailURL}
        //                 height={"200em"}
        //                 className="Artwork-img"
        //               />
        //             </div>
        //           </div>
        //           {/* <div className="Artwork-details-primary">
        //               {artwork.name}
        //             </div> */}
        //           {/* </div> */}
        //         </Link>
        //       );
        //     })}
        // </div>
        <div className="wall-container">
          <div className="wall">
            {artworks
              .filter((artwork_) =>
                category.includes(artwork_.category.toLocaleLowerCase())
              )
              .map((artwork) => {
                return (
                  <Link to={`/artwork/${artwork.id}`}>
                    <div
                      className="picture-frame"
                      style={{
                        transform: `rotate(${
                          Math.random() * rotationExtent - rotationExtent / 2
                        }deg)`,
                      }}
                    >
                      <img src={artwork.thumbnailURL} />
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkGrid;
