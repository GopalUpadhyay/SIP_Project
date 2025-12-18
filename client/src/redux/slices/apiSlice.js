import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./authSlice";

// Force Vite proxy usage in development to keep cookies same-site.
const isDev = import.meta.env.MODE === "development";
const API_URL = isDev
  ? "/api"
  : import.meta.env.VITE_APP_BASE_URL
  ? import.meta.env.VITE_APP_BASE_URL + "/api"
  : "/api";

// Include credentials by default so cookies (JWT) are sent/received.
const rawBaseQuery = fetchBaseQuery({ baseUrl: API_URL, credentials: "include" });

// Intercept 401s: if unauthorized, clear auth state so UI redirects to login.
const baseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
