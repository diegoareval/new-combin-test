import axios from "axios";
import { BASE_URL_SERVER } from "../config/environments";
import { JwtResponse } from "../models/user";
import jwt_decode from "jwt-decode";
import LocalStorageAuth from "../helpers/localStorageAuth";
import { toast } from "react-toastify";

export const setAxiosConfiguration = (Authorization?: string) => {
  const accessToken = LocalStorageAuth.getAuth();
  axios.defaults.baseURL = BASE_URL_SERVER;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.common["Authorization"] = Authorization
    ? Authorization
    : accessToken?.token
    ? accessToken.token
    : "";

  axios.interceptors.request.use(
    async (request) => {
      // You don't need Token
      if (request.data?.disableAuthorization) {
        return request;
      }

      const accessToken = LocalStorageAuth.getAuth();

      /* If the token is not present, it will redirect to the login page. */
      if (!accessToken?.token) {
        window.location.href = "/login";
        toast.error("Denied access, you must log-in!");
        return request;
      }

      /* Checking if the token is expired or not. */
      const tokenDecode: JwtResponse = jwt_decode(accessToken.token);
      const dateNow = new Date();
      const dateExp = new Date(tokenDecode.exp * 1000);

      if (dateNow.getTime() > dateExp.getTime()) {
        //RENEW TOKEN LOGIC HERE, NEED TOKEN VALID
        toast.error("Denied access, you must log-in!");
        window.location.href = "/login";
      }

      return request;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          if (error.response.data.redirect) {
            toast.error("Denied access, you must log-in!");
            window.location.href = "/login";
          }
        }
      }
      return Promise.reject(error);
    }
  );
};
