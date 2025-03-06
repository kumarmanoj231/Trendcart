import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full max-w-lg mx-auto p-4 relative bg-gray-800 rounded-lg shadow-lg">
      <div className="relative w-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute top-3 right-3">
          <HeartIcon product={product} />
        </div>
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`} className="text-pink-500 text-xl font-semibold">
          {product.name}
        </Link>
        <div className="mt-2 text-white font-bold text-lg">$ {product.price}</div>
      </div>
    </div>
  );
};

export default Product;
