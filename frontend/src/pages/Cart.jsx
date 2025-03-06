import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      {cartItems.length === 0 ? (
        <div className="text-center text-lg">
          Your cart is empty <Link to="/shop" className="text-pink-500">Go To Shop</Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl font-semibold mb-4 text-center md:text-left ml-20">Shopping Cart</h1>

            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col md:flex-row items-center bg-[#3D3D3D] p-4 rounded-lg mb-4 w-[80%] mx-auto hover:bg-[#4D4D4D] transition duration-300">
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 md:ml-6 text-center md:text-left mt-4 md:mt-0">
                  <Link to={`/product/${item._id}`} className="text-pink-500 text-lg font-medium">
                    {item.name}
                  </Link>
                  <div className="mt-2 text-gray-400">{item.brand}</div>
                  <div className="mt-2 text-white font-bold">$ {item.price}</div>
                </div>

                <div className="w-24 mt-4 md:mt-0">
                  <select
                    className="w-full p-2 border rounded-lg text-black"
                    value={item.qty}
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>

                <button
                  className="text-red-500 ml-4 mt-4 md:mt-0"
                  onClick={() => removeFromCartHandler(item._id)}
                >
                  <FaTrash className="text-xl" />
                </button>
              </div>
            ))}
          </div>

          <div className="w-full md:w-1/3 p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Summary</h2>
            <div className="text-lg font-medium">
              Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}):
            </div>
            <div className="text-2xl font-bold mt-2">
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </div>

            <button
              className="bg-pink-500 mt-6 py-3 px-4 rounded-lg text-lg w-full text-white"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;