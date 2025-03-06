import { useEffect, useState } from "react";
import { FaTrash, FaUser, FaUserShield, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import AdminMenu from "./AdminMenu";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="p-6 w-full min-h-screen bg-[#0f0f10] text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center text-springgreen">
        All Users
      </h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="w-full max-w-6xl">
          {/* Table for larger screens */}
          <div className="hidden md:block rounded-lg p-4 ">
            <table className="w-full text-sm md:text-base bg-white text-black rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-fuchsia-950 text-white">
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">NAME</th>
                  <th className="px-6 py-3 text-left">EMAIL</th>
                  <th className="px-6 py-3 text-left">ADMIN</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-3">{user._id}</td>
                    <td className="px-6 py-3">{user.username}</td>
                    <td className="px-6 py-3">
                      <a
                        href={`mailto:${user.email}`}
                        className="text-springgreen"
                      >
                        {user.email}
                      </a>
                    </td>
                    <td className="px-6 py-3">
                      {user.isAdmin ? (
                        <FaUserShield className="text-green-500" />
                      ) : (
                        <FaUser className="text-gray-500" />
                      )}
                    </td>
                    <td className="px-6 py-3">
                      {!user.isAdmin && (
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for smaller screens */}
          <div className="md:hidden flex flex-col items-center gap-6 mt-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="p-6 bg-white text-black rounded-xl shadow-lg w-4/5 text-center"
              >
                <div className="flex justify-center mb-2">
                  {user.isAdmin ? (
                    <FaUserShield className="text-green-500 text-2xl" />
                  ) : (
                    <FaUser className="text-gray-500 text-2xl" />
                  )}
                </div>
                <p className="font-semibold text-lg">{user.username}</p>
                <p className="text-sm opacity-80">{user._id}</p>
                <p className="mt-2">
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${user.email}`} className="text-black ">
                    {user.email}
                  </a>
                </p>
                {!user.isAdmin && (
                  <button
                    onClick={() => deleteHandler(user._id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg mt-3"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}

            <div className="md:w-1/4">
              <AdminMenu />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
