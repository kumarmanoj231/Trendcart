import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full md:w-[95%]">
        <div className="flex flex-col md:flex-row justify-center">
          <AdminMenu />
          <div className="w-full">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              Orders Management
            </h2>

            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error.error}
              </Message>
            ) : (
              <>
                {/* Table for Large Screens */}
                <div className="hidden md:block">
                  <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden mx-auto">
                    <thead>
                      <tr className="bg-gray-800 text-white text-left">
                        <th className="px-4 py-3 border-b border-gray-700">ITEM</th>
                        <th className="px-4 py-3 border-b border-gray-700">ID</th>
                        <th className="px-4 py-3 border-b border-gray-700">USER</th>
                        <th className="px-4 py-3 border-b border-gray-700">DATE</th>
                        <th className="px-4 py-3 border-b border-gray-700">TOTAL</th>
                        <th className="px-4 py-3 border-b border-gray-700">PAID</th>
                        <th className="px-4 py-3 border-b border-gray-700">DELIVERED</th>
                        <th className="px-4 py-3 border-b border-gray-700">ACTION</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.map((order, index) => (
                        <tr
                          key={order._id}
                          className={`border-b border-gray-700 ${
                            index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                          } hover:bg-gray-700 transition-all`}
                        >
                          <td className="px-4 py-4">
                            <img
                              src={order.orderItems[0].image}
                              alt="Order"
                              className="w-16 h-16 object-cover rounded-lg shadow-sm"
                            />
                          </td>
                          <td className="px-4 py-4">{order._id}</td>
                          <td className="px-4 py-4">
                            {order.user ? order.user.username : "N/A"}
                          </td>
                          <td className="px-4 py-4">
                            {order.createdAt
                              ? order.createdAt.substring(0, 10)
                              : "N/A"}
                          </td>
                          <td className="px-4 py-4 text-green-400 font-semibold">
                            $ {order.totalPrice}
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`px-3 py-1 text-white rounded-full text-sm ${
                                order.isPaid ? "bg-green-500" : "bg-red-500"
                              }`}
                            >
                              {order.isPaid ? "Paid" : "Pending"}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`px-3 py-1 text-white rounded-full text-sm ${
                                order.isDelivered ? "bg-green-500" : "bg-red-500"
                              }`}
                            >
                              {order.isDelivered ? "Delivered" : "Pending"}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <Link to={`/order/${order._id}`}>
                              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                                More
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cards for Small Screens */}
                <div className="block md:hidden flex flex-col items-center overflow-hidden">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-gray-900 p-5 rounded-lg shadow-md mb-4 w-[95%] mx-auto"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={order.orderItems[0].image}
                          alt="Order"
                          className="w-16 h-16 object-cover rounded-lg shadow-md"
                        />
                        <div className="text-white">
                          <p className="text-sm font-bold">
                            Order ID: {order._id}
                          </p>
                          <p className="text-sm">
                            User: {order.user ? order.user.username : "N/A"}
                          </p>
                          <p className="text-sm">
                            Date:{" "}
                            {order.createdAt
                              ? order.createdAt.substring(0, 10)
                              : "N/A"}
                          </p>
                          <p className="text-sm font-semibold text-green-400">
                            Total: $ {order.totalPrice}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex justify-between">
                        <span
                          className={`px-3 py-1 text-white rounded-full ${
                            order.isPaid ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Pending"}
                        </span>
                        <span
                          className={`px-3 py-1 text-white rounded-full ${
                            order.isDelivered ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {order.isDelivered ? "Delivered" : "Pending"}
                        </span>
                        <Link to={`/order/${order._id}`}>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded-lg shadow-md hover:bg-blue-700">
                            More
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
