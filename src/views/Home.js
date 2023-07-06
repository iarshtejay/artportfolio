import Header from "../components/Header/Header";
import CategoryGrid from "../components/CategoryGrid/CategoryGrid";
import Footer from "../components/Footer/Footer";
import { Carousel } from "../components/Carousel/Carousel";

const Home = () => {
  return (
    <div>
      <Header />
      <Carousel />
      <CategoryGrid isHome={true} />
      <Footer />
    </div>
  );
};

export default Home;
