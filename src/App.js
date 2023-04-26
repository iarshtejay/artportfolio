import "./App.css";
import Header from "./components/Header/Header";
import CategoryGrid from "./components/CategoryGrid/CategoryGrid";
import ArtworkGrid from "./components/ArtworkGrid/ArtworkGrid";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import categories from "./data/categories.json"

const router = createBrowserRouter([
  {
    path: "/",
    element: <CategoryGrid />,
  },
  ...categories.map((category) => {
    return { path: `${category.toLowerCase()}`, element: <ArtworkGrid /> };
  }),
]);

function App() {
  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
