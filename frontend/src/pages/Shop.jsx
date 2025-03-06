import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) =>
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 md:px-[2rem] lg:px-[5rem]">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-[#151515] p-4 rounded-lg w-full md:w-1/4 w-[90%] mx-auto">
          <h2 className="text-lg font-bold text-white text-center bg-black py-2 rounded-md">
            Filter by Categories
          </h2>
          <div className="space-y-2 mt-4">
            {categories?.map((c) => (
              <div key={c._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                />
                <label className="text-sm text-white">{c.name}</label>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-bold text-white text-center bg-black py-2 mt-6 rounded-md">
            Filter by Brands
          </h2>
          <div className="space-y-2 mt-4">
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="w-4 h-4 text-pink-400 focus:ring-pink-500"
                />
                <label className="text-sm text-white">{brand}</label>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-bold text-white text-center bg-black py-2 mt-6 rounded-md">
            Filter by Price
          </h2>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 rounded-lg focus:ring focus:border-pink-300"
            />
          </div>
          <button
            className="w-full mt-4 py-2 bg-gray-700 text-white rounded-md"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </div>

        <div className="w-full md:w-3/4 w-[90%] mx-auto">
          <h2 className="text-lg font-bold text-center mb-4">
            {products?.length} Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length === 0 ? (
              <Loader />
            ) : (
              products?.map((p) => (
                <div key={p._id} className="rounded-lg overflow-hidden shadow-lg">
                  <ProductCard p={p} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;