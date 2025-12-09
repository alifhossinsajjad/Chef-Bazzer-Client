import Lottie from "lottie-react";
import forbiddenAnimation from "../../assets/json/error.json";

const ErrorPage = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Lottie animationData={forbiddenAnimation} className=" w-[700px]" />
  </div>
);

export default ErrorPage;
