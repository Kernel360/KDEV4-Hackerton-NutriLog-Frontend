import React, { useState, useEffect } from "react";

interface NotificationProps {
  title: string;
  body: string;
}

const NotificationComponent: React.FC<NotificationProps> = ({
  title,
  body,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // 알림 5초 후 자동으로 사라짐

    return () => clearTimeout(timer);
  }, []);

  return (
    isVisible && (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded-lg w-80 z-50 shadow-lg">
        <div className="font-semibold text-lg">{title}</div>
        <div className="text-sm">{body}</div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-white text-xl hover:text-red-500 focus:outline-none"
        >
          ×
        </button>
      </div>
    )
  );
};

export default NotificationComponent;
