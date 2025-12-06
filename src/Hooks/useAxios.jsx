import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5173/",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
