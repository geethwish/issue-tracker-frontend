import axios from "axios";
import { toast } from "react-toastify";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api", // Replace with your API base URL
});

// Request interceptor to add the authorization token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Ensure login and register APIs have the Bearer token
    const loginOrRegister = ["/login", "/register"].some((url) =>
      config.url?.includes(url)
    );

    if (loginOrRegister && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 400:
          toast.error("Bad request. Please check your input.", {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case 401:
          toast.error("Unauthorized. Please log in again.", {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case 403:
          toast.error(
            "Forbidden. You do not have permission to perform this action.",
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
          break;
        case 404:
          toast.error("Resource not found.", {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case 500:
          toast.error("Internal server error. Please try again later.", {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        default:
          toast.error("An unknown error occurred. Please try again.", {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
      }
    } else {
      toast.error("Network error. Please check your internet connection.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
