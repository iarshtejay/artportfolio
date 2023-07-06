import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ArtworksContext } from "./contexts/ArtworksContext";
import airtableClient from "./lib/airtable";
import { useState, useEffect } from "react";
import Home from "./views/Home";
import Category from "./views/Category";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/category/:categoryName",
      element: <Category />,
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
