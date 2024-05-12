import request from "@/Utils/AxiosUtils";
import { NoticeRecent } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import NoticeDashBoard from "./NoticeDashBoard";
import ProductStockReportTable from "./ProductStockReport/ProductStockReportTable";
import RecentOrderTable from "./RecentOrders/RecentOrderTable";
import RevenueAndTopVendor from "./Revenue&TopVendor";
import TopDashSection from "./TopDashSection";

const MainDashboard = () => {
  const role = JSON.parse(localStorage.getItem("role"))?.name;
  const isAdmin = role === "admin";

  const { data, refetch } = useQuery([NoticeRecent],() =>  !isAdmin ?  request({ url: NoticeRecent }) :Promise.resolve() ,{
      refetchOnWindowFocus: false,
      enabled: !isAdmin,
      select: (data) => data?.data,
    }
  );
  return (
    <>
      {data?.is_read === 0 && <NoticeDashBoard data={data} refetch={refetch} />}
      <TopDashSection  role={role} />
      <section>
        <RevenueAndTopVendor role={role} />
        <RecentOrderTable />
        <ProductStockReportTable role={role} />
      </section>
    </>
  );
};

export default MainDashboard;
