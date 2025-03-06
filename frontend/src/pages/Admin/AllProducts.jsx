import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div className="text-center text-lg font-semibold mt-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-lg font-semibold mt-10 text-red-500">Error loading products</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row gap-6 w-[95%]">
        {/* Products Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
            All Products ({products.length})
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="block bg-gray-900 p-5 rounded-xl shadow-lg transition-transform hover:scale-105"
              >
                <div className="flex flex-col items-center w-full h-72 justify-between">
                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-40 h-40 object-cover rounded-lg"
                  />

                  {/* Product Details */}
                  <div className="text-center w-full">
                    <h2 className="text-lg font-semibold text-white truncate">{product.name}</h2>
                    <p className="text-gray-400 text-xs mt-1">
                      {moment(product.createdAt).format("MMM Do YYYY")}
                    </p>
                    <p className="text-gray-300 text-sm mt-2 truncate w-full">
                      {product?.description?.substring(0, 50)}...
                    </p>
                  </div>

                  {/* Bottom Section (Price & Button) */}
                  <div className="w-full flex justify-between items-center mt-2">
                    <p className="text-lg font-bold text-white">$ {product?.price}</p>
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="px-3 py-1 text-xs font-medium text-white bg-pink-700 rounded-md hover:bg-pink-800 transition"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/4">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
