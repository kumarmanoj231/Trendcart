import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="container mx-auto p-4 lg:px-[5rem]">
      <h1 className="text-lg font-bold text-center mb-6">FAVORITE PRODUCTS</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div key={product._id} className="md:w-full w-[90%] max-w-xl mx-auto">
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
