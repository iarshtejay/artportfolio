import "./App.css";
import Header from "./components/Header/Header";
import CategoryGrid from "./components/CategoryGrid/CategoryGrid";
import ArtworkGrid from "./components/ArtworkGrid/ArtworkGrid";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import categories from "./data/categories.json";
import { Carousel } from "./components/Carousel/Carousel";
import { ArtworksContext } from "./contexts/ArtworksContext";
import airtableClient from "./lib/airtable";
import { useState, useEffect } from "react";
import Artwork from "./components/Artwork/Artwork";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Header />
          <Carousel />
          <CategoryGrid isHome={true}/>
        </div>
      ),
    },
    {
      path: "/artwork/:artworkId",
      element: (
        <div>
          <Header />
          <CategoryGrid />
          <Artwork />
        </div>
      ),
    },
    {
      path: "/category/:categoryName",
      element: (
        <div>
          <Header />
          <CategoryGrid />
          <ArtworkGrid />
        </div>
      ),
    },
  ]);
  const [artworks, setArtworks] = useState([]);
  const [artworksLoading, setArtworksLoading] = useState(false);

  useEffect(() => {
    const onPageLoad = () => {
      airtableClient
        .get("/")
        .then((res) => {
          const records = res.data.records.map((record) => {

            return {
              id: record.id,
              name: record.fields.name,
              category: record.fields.category,
              thumbnail: record.fields.image[0].thumbnails.large,
              featured: record.fields.featured,
              imageURL: record.fields.image[0].url,
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

  return (
    <ArtworksContext.Provider value={{ artworks, artworksLoading }}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ArtworksContext.Provider>
  );
}

export default App;
