import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 w-full px-4">
      {isLoading ? null : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <Slider {...settings} className="w-full max-w-6xl mx-auto">
          {products.map(({
            image,
            _id,
            name,
            price,
            description,
            brand,
            createdAt,
            numReviews,
            rating,
            quantity,
            countInStock,
          }) => (
            <div key={_id} className="p-4">
              <img
                src={image}
                alt={name}
                className="w-full rounded-lg object-cover h-48 sm:h-64 md:h-80 lg:h-96"
              />

              <div className="mt-4 flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-semibold">{name}</h2>
                  <p className="text-lg md:text-xl font-bold text-gray-900">$ {price}</p>
                  <p className="mt-2 text-gray-700 text-sm md:text-base">
                    {description.substring(0, 170)} ...
                  </p>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-4 text-gray-700 text-xs sm:text-sm md:text-base">
                  <div>
                    <h1 className="flex items-center gap-2"><FaStore className="text-blue-600" /> Brand: {brand}</h1>
                    <h1 className="flex items-center gap-2"><FaClock className="text-blue-600" /> Added: {moment(createdAt).fromNow()}</h1>
                    <h1 className="flex items-center gap-2"><FaStar className="text-yellow-500" /> Reviews: {numReviews}</h1>
                  </div>

                  <div>
                    <h1 className="flex items-center gap-2"><FaStar className="text-yellow-500" /> Ratings: {Math.round(rating)}</h1>
                    <h1 className="flex items-center gap-2"><FaShoppingCart className="text-green-600" /> Quantity: {quantity}</h1>
                    <h1 className="flex items-center gap-2"><FaBox className="text-red-600" /> In Stock: {countInStock}</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;