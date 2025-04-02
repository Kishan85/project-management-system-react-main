import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/myConstants";
import { createHeaders } from "../utils/Utils";

const useFetchData = (url, body) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const config = createHeaders();
        const response = await axios.post(`${BASE_URL}${url}`, body, config);

        if (response?.data.status == "success") {
          setStatus(response.data.status);
          setData(response.data.data);
        } else {
          setStatus(null);
          setData([]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { status, data, error, loading };
};

export default useFetchData;
