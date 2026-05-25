import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(config => {
    const token = localStorage.getItem("access-token");

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  });

  return axiosSecure;
};

export default useAxiosSecure;