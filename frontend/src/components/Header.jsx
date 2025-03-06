import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1 className="text-center text-red-500">ERROR</h1>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4">
      {/* Products Grid - Visible on md+ screens */}
      {/* <div className="hidden md:grid grid-cols-2 gap-4 w-full md:w-1/2 lg:w-1/3">
        {data.map((product) => (
          <div key={product._id}>
            <SmallProduct product={product} />
          </div>
        ))}
      </div> */}
      
      {/* Product Carousel - Always Visible */}
      <div className="w-full mx-auto md:w-2/3 lg:w-2/3">
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Header;