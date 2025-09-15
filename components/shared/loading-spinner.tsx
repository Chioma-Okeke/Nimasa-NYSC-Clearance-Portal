import React from "react";

const LoadingSpinner: React.FC<{ size?: string }> = ({ size = "h-5 w-5" }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-4 border-gray-300 border-t-[#3eb56d] ${size}`}
      />
    </div>
  );
};

export default LoadingSpinner;
