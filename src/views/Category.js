import Header from "../components/Header/Header";
import CategoryGrid from "../components/CategoryGrid/CategoryGrid";
import ArtworkGrid from "../components/ArtworkGrid/ArtworkGrid";
import Footer from "../components/Footer/Footer";

const Category = () => {
  return (
    <div>
      <Header />
      <CategoryGrid />
      <ArtworkGrid />
      <Footer />
    </div>
  );
};

export default Category;
