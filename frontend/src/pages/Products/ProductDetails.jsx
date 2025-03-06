import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-white font-semibold hover:underline">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.message}</Message>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg"
            />
            <HeartIcon product={product} className="absolute top-2 right-2" />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-gray-400">{product.description}</p>
            <p className="text-4xl font-bold">$ {product.price}</p>

            <div className="grid grid-cols-2 gap-4 text-white">
              <div>
                <p className="flex items-center"><FaStore className="mr-2" /> Brand: {product.brand}</p>
                <p className="flex items-center"><FaClock className="mr-2" /> Added: {moment(product.createAt).fromNow()}</p>
                <p className="flex items-center"><FaStar className="mr-2" /> Reviews: {product.numReviews}</p>
              </div>
              <div>
                <p className="flex items-center"><FaStar className="mr-2" /> Ratings: {product.rating}</p>
                <p className="flex items-center"><FaShoppingCart className="mr-2" /> Quantity: {product.quantity}</p>
                <p className="flex items-center"><FaBox className="mr-2" /> In Stock: {product.countInStock}</p>
              </div>
            </div>

            {product.countInStock > 0 && (
              <div>
                <select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="p-2 w-full rounded-lg text-black"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className="bg-pink-600 text-white py-2 px-4 rounded-lg w-full"
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}
      <hr className="mt-3 bg-green-100"/>

      <div className="mt-12">
        <ProductTabs
          loadingProductReview={loadingProductReview}
          userInfo={userInfo}
          submitHandler={submitHandler}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          product={product}
        />
      </div>
    </div>
  );
};

export default ProductDetails;