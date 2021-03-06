import axios from "axios";

const useApiCall = () => {
  const Token = localStorage.getItem("Authorization");
  const apiCalling = (method, url, data) => {
    return axios.create({
      baseURL: "https://some-domain.com/api/V1/",
      timeout: 1000,
      method,
      url,
      data,
      headers: { Authorization: Token },
    });
  };

  return { apiCalling };
};

export default useApiCall;
