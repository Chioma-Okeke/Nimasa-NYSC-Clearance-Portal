import React from "react";

const LoadingSpinner: React.FC<{ size?: string }> = ({ size = "h-8 w-8" }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-4 border-gray-300 border-t-blue-500 ${size}`}
      />
    </div>
  );
};

export default LoadingSpinner;
