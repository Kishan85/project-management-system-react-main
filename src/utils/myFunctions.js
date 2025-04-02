import { getCompanyStructureLevelDDAPI, getDepartmentDDAPI, getPriorityDDAPI, getProjectDDAPI } from "../api/dropdowns";
import {
  getCompanyStructureListAPI,
  getDepartmentListAPI,
  getDesignationListAPI,
  getPriorityListAPI,
} from "../api/master";
import useLogout from "./useLogout";

export const getDepartmentListTable = (setData) => {
  const bodyData = {
    id: "",
  };
  getDepartmentListAPI()
    .then((res) => {
      if (res.data.status === "success") {
        setData(res.data.data);
      } else if (res.data.status === "failed") {
        setData([]);
      } else if (res.data.status === "expired") {
        const logout = useLogout()
        logout(res.data.message)
      }
    })
    .catch((err) => {
      console.log("something went wrong");
    });
};
export const getCompanyStructureListTable = (setData) => {
  const bodyData = {
    id: "",
  };
  getCompanyStructureListAPI()
    .then((res) => {
      if (res.data.status === "success") {
        setData(res.data.data);
      } else if (res.data.status === "failed") {
        setData([]);
      } else if (res.data.status === "expired") {
        const logout = useLogout()
        logout(res.data.message)
      }
    })
    .catch((err) => {
      console.log("something went wrong");
    });
};
export const getPriorityListTable = (setData) => {
  const bodyData = {
    id: "",
  };
  getPriorityListAPI()
    .then((res) => {
      if (res.data.status === "success") {
        setData(res.data.data);
      } else if (res.data.status === "failed") {
        setData([]);
      } else if (res.data.status === "expired") {
        const logout = useLogout()
        logout(res.data.message)
      }
    })
    .catch((err) => {
      console.log("something went wrong");
    });
};
export const getCompanyStructureDDList = (setCompanyLevelList) => {
  const bodyData = {
    id: "",
  };
  getCompanyStructureLevelDDAPI()
    .then((res) => {
      if (res.data.status === "success") {
        // console.log("dd", res.data);
        setCompanyLevelList(res.data.data);
      } else if (res.data.status === "failed") {
        setCompanyLevelList([]);
      } else if (res.data.status === "expired") {
        const logout = useLogout()
        logout(res.data.message)
      }
    })
    .catch((err) => {
      console.log("something went wrong");
    });
};
export const getDesignationListTable = (setData) => {
  getDesignationListAPI()
    .then((res) => {
      if (res.data.status === "success") {
        setData(res.data.data);
      } else if (res.data.status === "failed") {
        setData([]);
      } else if (res.data.status === "expired") {
        const logout = useLogout()
        logout(res.data.message)
      }
    })
    .catch((err) => {
      console.log("something went wrong");
    });
};
export const getDepartmentList = (setDepartmentList, setValue, name) => {
  getDepartmentListAPI()
    .then((res) => {
      if (res.data.status === "success") {
        let a = res.data.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setValue(name, a);
        setDepartmentList(a);
      } else if (res.data.status === "failed") {
        setDepartmentList([]);
      } else if (res.data.status === "expired") {
        const logout = useLogout()
        logout(res.data.message)
      }
    })
    .catch((err) => {
      console.log("something went wrong");
    });
};
export const getProjectDDList = (setValue, name) => {
  getProjectDDAPI()
    .then((res) => {
      if (res.data.status === "success") {
        setValue(name, res.data.data);
      } else if (res.data.status === "failed") {
        setValue([]);
      } else if (res.data.status === "expired") {
        const logout=useLogout()
        logout(res.data.message)
      }
    })
    .catch((err) => {
      console.log("something went wrong");
    });
};
export const getPriorityDDList = (setValue, name) => {
  getPriorityDDAPI()
    .then((res) => {
      if (res.data.status === "success") {
        setValue(name, res.data.data);
      } else if (res.data.status === "failed") {
        setValue([]);
      } else if (res.data.status === "expired") {
        const logout=useLogout()
        logout(res.data.message)
      }
    })
    .catch((err) => {
      console.log("something went wrong");
    });
};
export const getDepartmentDDList = (setValue, name) => {

  getDepartmentDDAPI()
    .then((res) => {
      if (res.data.status === "success") {
        setValue(name, res.data.data);
      } else if (res.data.status === "failed") {
        setValue([]);
      } else if (res.data.status === "expired") {
        const logout=useLogout()
        logout(res.data.message)
      }
    })
    .catch((err) => {
      console.log("something went wrong");
    });
};
