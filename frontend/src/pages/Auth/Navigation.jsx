import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Sidebar Toggle Button - Visible Only on Small & Medium Screens */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded"
      >
        {showSidebar ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Sidebar - Only Visible on Large Screens */}
      <div
        style={{ zIndex: 9999 }}
        className={`${
          showSidebar ? "flex w-[60%]" : "hidden"
        } lg:flex flex-col justify-between p-4 text-white bg-[#000] lg:w-[4%] lg:hover:w-[15%] h-[100vh] fixed`}
        id="navigation-container"
      >
        {/* Close Button Inside Sidebar (For Small & Medium Screens) */}
        {showSidebar && (
          <button
            onClick={toggleSidebar}
            className="lg:hidden absolute top-4 right-4 text-white"
          >
            <AiOutlineClose size={24} />
          </button>
        )}

        <div className="flex flex-col justify-center space-y-4 mt-8">
          <Link to="/" className="flex items-center hover:translate-x-2">
            <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">HOME</span>
          </Link>

          <Link to="/shop" className="flex items-center hover:translate-x-2">
            <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
          </Link>

          <Link to="/cart" className="flex relative">
            <div className="flex items-center hover:translate-x-2">
              <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Cart</span>
            </div>
            {cartItems.length > 0 && (
              <div className="absolute top-9">
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </div>
            )}
          </Link>

          <Link to="/favorite" className="flex relative">
            <div className="flex items-center hover:translate-x-2">
              <FaHeart className="mt-[3rem] mr-2" size={20} />
              <span className="hidden nav-item-name mt-[3rem]">Favorites</span>
              <FavoritesCount />
            </div>
          </Link>
        </div>

        <div className="relative">
          {userInfo ? (
            <button onClick={toggleDropdown} className="flex items-center text-white">
              <span className="text-[12px] font-bold">{userInfo.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            </button>
          ) : (
            <ul>
              <li>
                <Link to="/login" className="flex items-center mt-5 hover:translate-x-2">
                  <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                  <span className="hidden nav-item-name">LOGIN</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="flex items-center mt-5 hover:translate-x-2">
                  <AiOutlineUserAdd size={26} />
                  <span className="hidden nav-item-name">REGISTER</span>
                </Link>
              </li>
            </ul>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && userInfo && (
            <ul className="absolute bottom-full right-0 mb-2 bg-[#3D3D3D] text-white rounded-[0.5rem]">
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-[#6A1E55]">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-[#6A1E55]">
                      Products
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/profile" className="block px-4 py-2 hover:bg-[#6A1E55]">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left hover:bg-[#6A1E55]"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
