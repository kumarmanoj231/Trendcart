import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: { type: "line", height: 350 },
      tooltip: { theme: "dark" },
      colors: ["#00E396"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      title: { text: "Sales Trend", align: "left", style: { fontSize: "18px" } },
      grid: { borderColor: "#ccc" },
      markers: { size: 4 },
      xaxis: { categories: [], title: { text: "Date" } },
      yaxis: { 
        title: { text: "Sales ($)" }, 
        min: 0,
        labels: { formatter: (value) => `$${value.toFixed(2)}` }
      },
      annotations: {
        yaxis: [
          {
            y: 1000,
            borderColor: "#FF4560",
            label: {
              borderColor: "#FF4560",
              style: {
                color: "#fff",
                background: "#FF4560",
              },
              text: "$1000 Mark",
            },
          },
        ],
      },
      legend: { position: "top", horizontalAlign: "right", floating: true, offsetY: -10, offsetX: -5 },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail && salesDetail.length > 0) {
      const formattedSalesData = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales || 0,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: { categories: formattedSalesData.map((item) => item.x) },
        },
        series: [{ name: "Sales", data: formattedSalesData.map((item) => item.y) }],
      }));
    }
  }, [salesDetail]);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center w-[90%] m-auto">
      <AdminMenu />
      <h1 className="text-3xl font-bold mt-4">Admin Dashboard</h1>
      <section className="w-[95%] flex flex-col items-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="rounded-lg bg-[#3D3D3D] p-6 flex flex-col items-center shadow-md w-full">
            <div className="rounded-full w-12 h-12 flex items-center justify-center bg-pink-500 text-white text-xl font-bold">💰</div>
            <p className="mt-4 text-lg">Total Sales</p>
            <h1 className="text-2xl font-bold">{isLoading ? <Loader /> : `$ ${sales?.totalSales?.toFixed(2)}`}</h1>
          </div>

          <div className="rounded-lg bg-[#3D3D3D] p-6 flex flex-col items-center shadow-md w-full">
            <div className="rounded-full w-12 h-12 flex items-center justify-center bg-pink-500 text-white text-xl font-bold">👥</div>
            <p className="mt-4 text-lg">Customers</p>
            <h1 className="text-2xl font-bold">{loading ? <Loader /> : customers?.length}</h1>
          </div>

          <div className="rounded-lg bg-[#3D3D3D] p-6 flex flex-col items-center shadow-md w-full">
            <div className="rounded-full w-12 h-12 flex items-center justify-center bg-pink-500 text-white text-xl font-bold">📦</div>
            <p className="mt-4 text-lg">Total Orders</p>
            <h1 className="text-2xl font-bold">{loadingTwo ? <Loader /> : orders?.totalOrders}</h1>
          </div>
        </div>

        <div className="w-full mt-10 flex justify-center">
          <div className="p-6 rounded-lg shadow-md w-full max-w-5xl">
            <h2 className="text-center text-xl font-semibold mb-4">Sales Performance</h2>
            {salesDetail?.length > 0 ? (
              <Chart options={state.options} series={state.series} type="line" height={350} />
            ) : (
              <p className="text-center text-gray-600">No sales data available</p>
            )}
          </div>
        </div>

        <div className="w-full mt-10">
          <OrderList />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
