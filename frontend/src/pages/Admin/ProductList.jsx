import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  // 🔹 Handle Image Upload
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await uploadProductImage(formData).unwrap();
      console.log("Upload Response:", res); // 🔍 Debugging log
  
      if (res.imageUrl) {
        toast.success("✅ Image uploaded successfully!");
        setImage(res.imageUrl);
        setImageUrl(res.imageUrl);
      } else {
        toast.error("❌ Failed to retrieve image URL.");
        console.error("Image URL missing in response:", res);
      }
    } catch (error) {
      toast.error(error?.data?.message || "❌ Image upload failed.");
      console.error("Upload Error:", error);
    }
  };
  

  // 🔹 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting with image:", image); // ✅ Debugging Log

    if (!image) {
      toast.error("❌ Please upload an image before submitting.");
      return;
    }

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      toast.success(`✅ ${data.name} created successfully!`);
      navigate("/");
    } catch (error) {
      toast.error("❌ Product creation failed. Try again.");
      console.error("Form Submission Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-6 bg-[#101011] rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-5 text-center">
            Create Product
          </h2>

          {imageUrl && (
            <div className="text-center mb-4">
              <img
                src={imageUrl}
                alt="Product"
                className="w-40 h-40 mx-auto rounded-lg shadow-md object-cover"
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload */}
            <label className="block text-white font-semibold">
              Product Image
              <input
                type="file"
                accept="image/*"
                onChange={uploadFileHandler}
                className="block w-full mt-2 p-2 border rounded-lg bg-[#1a1a1b] text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </label>

            {/* Name & Price */}
            <div className="grid md:grid-cols-2 gap-4">
              <label className="block text-white font-semibold">
                Name
                <input
                  type="text"
                  className="block w-full mt-2 p-3 border rounded-lg bg-[#1a1a1b] text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="block text-white font-semibold">
                Price ($)
                <input
                  type="number"
                  className="block w-full mt-2 p-3 border rounded-lg bg-[#1a1a1b] text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
            </div>

            {/* Quantity & Brand */}
            <div className="grid md:grid-cols-2 gap-4">
              <label className="block text-white font-semibold">
                Quantity
                <input
                  type="number"
                  className="block w-full mt-2 p-3 border rounded-lg bg-[#1a1a1b] text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </label>
              <label className="block text-white font-semibold">
                Brand
                <input
                  type="text"
                  className="block w-full mt-2 p-3 border rounded-lg bg-[#1a1a1b] text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </label>
            </div>

            {/* Description */}
            <label className="block text-white font-semibold">
              Description
              <textarea
                className="block w-full mt-2 p-3 border rounded-lg bg-[#1a1a1b] text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>

            {/* Stock & Category */}
            <div className="grid md:grid-cols-2 gap-4">
              <label className="block text-white font-semibold">
                Count In Stock
                <input
                  type="number"
                  className="block w-full mt-2 p-3 border rounded-lg bg-[#1a1a1b] text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </label>
              <label className="block text-white font-semibold">
                Category
                <select
                  className="block w-full mt-2 p-3 border rounded-lg bg-[#1a1a1b] text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 text-lg font-bold text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-all duration-300 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
