import Lottie from "lottie-react";

import forbiddenAnimation from "../../assets/json/forbidden.json";
import { Link } from "react-router";

const ForbiddenAccess = ({ 
  title = "Access Denied", 
  message = "You don't have permission to access this resource.",
  showHomeBtn = true,
  showDashboardBtn = false,
  customActions
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Animation */}
        <div className="relative mx-auto w-64 h-64">
          <Lottie
            animationData={forbiddenAnimation}
            loop={true}
            autoplay={true}
            className="drop-shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-800">
            {title}
          </h1>
          <p className="text-gray-600">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showHomeBtn && (
            <Link
              to="/"
              className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg"
            >
              Go to Home
            </Link>
          )}
          
          {showDashboardBtn && (
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              Dashboard
            </Link>
          )}
          
          {customActions}
        </div>

        {/* Help text */}
        <p className="text-sm text-gray-500 mt-4">
          Need help? Contact support if you believe this is an error.
        </p>
      </div>
    </div>
  );
};

export default ForbiddenAccess;