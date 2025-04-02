import React, { useEffect, useMemo, useState } from "react";
import Head from "../../layout/head/Head";
import Pricing from "../../pages/panel/subscription/Pricing";
import pricingTableData from "../../pages/panel/subscription/data/pricingTable";
import { getPlanListAPI } from "../../api/dashboard/planList";
import useDataFetch from "../../myHooks/useDataFetch";
import { toast } from "react-toastify";
import useLogout from "../../utils/useLogout";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pricingCardData, setPricingCardData] = useState([]
    // JSON.parse(sessionStorage.getItem("pricingTableData")) || pricingTableData
  ); // Load from sessionStorage)
  // const { data: planData, loading: loadingPlans } = useDataFetch("plan-list", "pricingTableData");
  // const { data: userData, loading: loadingUsers } = useDataFetch("department-list", "departmentTableData");

  // if (loadingPlans || loadingUsers) {
  //   return <div>Loading...</div>;
  // }

  // console.log("Plan data:", planData);
  // console.log("User data:", userData);
  const logout=useLogout()
  useEffect(() => {
    planList();
  }, []);
  const planList = () => {
    getPlanListAPI()
      .then((res) => {
        if (res.data.status === "success") {
          setIsLoading(false);
          setPricingCardData(res.data.data || []);
          sessionStorage.setItem("pricingTableData", JSON.stringify(res.data.data));
        } else if (res.data.status === "failed") {
          sessionStorage.removeItem("pricingTableData");
          setPricingCardData([]);
          toast.error(res.data.message);
        } else if (res.data.status === "expired") {
          logout(res.data.message);
        }
      })
      .catch((err) => {
        console.error("API error:", err);
        setIsLoading(false);
      });
  };
  // Memoize pricingCardData to avoid unnecessary re-renders
  const memoizedPricingTableData = useMemo(() => pricingCardData, [pricingCardData]);
  return (
    <>
      <Head title={"Home Page"} />
      <Pricing pricingTableData={memoizedPricingTableData} head />
    </>
  );
};

export default HomePage;
