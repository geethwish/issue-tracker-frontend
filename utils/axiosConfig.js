import axios from "axios";
import { toast } from "react-toastify";

// Log the base URL to verify it is being set correctly
console.log("Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://issue-tracker-gw-dc161ae755ff.herokuapp.com/api";
const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "https://issue-tracker-gw-dc161ae755ff.herokuapp.com/api",
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
            position: "top-right",
          });
          break;
        case 401:
          toast.error("Unauthorized. Please log in again.", {
            position: "top-right",
          });
          localStorage.clear();
          window.location.href = "/login";
          break;
        case 403:
          toast.error(
            "Forbidden. You do not have permission to perform this action.",
            {
              position: "top-right",
            }
          );
          break;
        case 404:
          toast.error("Resource not found.", {
            position: "top-right",
          });
          break;
        case 500:
          toast.error("Internal server error. Please try again later.", {
            position: "top-right",
          });
          break;
        default:
          toast.error("An unknown error occurred. Please try again.", {
            position: "top-right",
          });
          break;
      }
    } else {
      toast.error("Network error. Please check your internet connection.", {
        position: "top-right",
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
