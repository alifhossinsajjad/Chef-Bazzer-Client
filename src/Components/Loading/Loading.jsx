import Lottie from "lottie-react";
import loadingAnimation from "../../assets/json/loading.json";

const Loading = ({ className = "" }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Lottie animationData={loadingAnimation} className="w-48 h-48 flex items-center justify-center" />
    </div>
  );
};

export default Loading;