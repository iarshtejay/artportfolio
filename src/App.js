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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Carousel />
          <CategoryGrid />
        </div>
      ),
    },
    {
      path: "/carousel",
      element: <Carousel />,
    },
    ...categories.map((category) => {
      return { path: `${category.toLowerCase()}`, element: <ArtworkGrid /> };
    }),
  ]);
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
              featured: record.fields.featured,
            };
          });
          console.log("Fetching from App");
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
        <Header />
        <RouterProvider router={router} />
      </div>
    </ArtworksContext.Provider>
  );
}

export default App;
