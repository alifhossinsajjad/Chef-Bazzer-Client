import axios from "axios";
import React from "react";

const axiosIntace = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxios = () => {
  return axiosIntace;
};

export default useAxios;
