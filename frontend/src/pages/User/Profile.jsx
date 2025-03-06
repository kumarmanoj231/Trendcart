import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({ _id: userInfo._id, username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-[100dvh] overflow-hidden">
      <div className="lg:w-1/2 w-full max-w-md p-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">Update Profile</h1>
        <form onSubmit={submitHandler} className="w-full">
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Name</label>
            <input
              type="text"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Email Address</label>
            <input
              type="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Confirm Password</label>
            <input
              type="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            disabled={loadingUpdateProfile}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer w-full"
          >
            {loadingUpdateProfile ? "Updating..." : "Update"}
          </button>
          {loadingUpdateProfile && <Loader />}
        </form>
        <div className="mt-4 text-center">
          <Link to="/user-orders" className="text-pink-500 hover:underline">
            My Orders
          </Link>
        </div>
      </div>
      <div className="lg:w-1/2 w-full hidden lg:flex justify-center h-[100dvh]">
        <img
          src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
          alt="Profile Illustration"
          className="w-[70%] h-[90dvh] object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Profile;
