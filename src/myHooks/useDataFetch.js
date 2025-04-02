// import { useEffect, useMemo } from "react";
// import axios from "axios";
// import { BASE_URL } from "../constants/myConstants";
// import { createHeaders } from "../utils/Utils";

// const useDataFetch = (url, storeKey) => {
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Check if data for this key is already in session storage
//         const cachedData = sessionStorage.getItem(storeKey);

//         if (cachedData) {
//           console.log(`Using cached data for ${storeKey}`);
//           return; // Avoid re-fetching if cached data is available
//         }

//          const config = createHeaders();
//         // Fetch the data if not in session storage
//         const response = await axios.post(`${BASE_URL}${url}`,{},config);
//         const result = response.data; // Get the response data

//         // Store the fetched data in session storage
//         sessionStorage.setItem(storeKey, JSON.stringify(result));
//         console.log(`Data for ${storeKey} fetched and stored in session storage.`);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [url, storeKey]);

//   // Memoize the data from session storage
//   const memoizedData = useMemo(() => {
//     const storedData = sessionStorage.getItem(storeKey);
//     console.log("session",JSON.parse(storedData));
    
//     return storedData ? JSON.parse(storedData) : null;
//   }, [storeKey]);

//   return memoizedData;
// };

// export default useDataFetch;

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/myConstants";
import { createHeaders } from "../utils/Utils";

const useDataFetch = (url, storeKey) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = sessionStorage.getItem(storeKey);
        if (cachedData) {
          console.log(`Using cached data for ${storeKey}`);
          setData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        const config = createHeaders();
        const response = await axios.post(`${BASE_URL}${url}`, {}, config);
        const result = response.data;

        sessionStorage.setItem(storeKey, JSON.stringify(result));
        console.log(`Data for ${storeKey} fetched and stored in session storage.`);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, storeKey]);

  return { data, loading };
};

export default useDataFetch;


