import React, { useState, useEffect } from "react";

function Board1() {
  const [isVisible, setIsVisible] = useState(false); // Controls visibility
  const message = "Limited-Time Offer: Get 50% off on all items!";
  const REAPPEAR_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

  useEffect(() => {
    // Check local storage for the next eligible display time
    const nextDisplayTime = localStorage.getItem("nextDisplayTime");
    const currentTime = Date.now();

    if (!nextDisplayTime || currentTime >= nextDisplayTime) {
      // If no time is set or the time has passed, show the banner
      setIsVisible(true);
      // Set the next display time to 1 hour from now
      localStorage.setItem("nextDisplayTime", currentTime + REAPPEAR_TIME);
    }

    if (isVisible) {
      // Automatically hide the banner after 30 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 30000);

      return () => clearTimeout(hideTimer); // Cleanup on unmount
    }
  }, [isVisible]);

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4">
      {isVisible && (
        <div className="w-full max-w-2xl">
          {/* Banner Message Board */}
          <div className="bg-yellow-200 text-yellow-800 font-bold text-lg px-4 py-3 rounded-md shadow-md text-center border border-yellow-400">
            {message}
          </div>
        </div>
      )}
    </div>
  );
}

export default Board1;
