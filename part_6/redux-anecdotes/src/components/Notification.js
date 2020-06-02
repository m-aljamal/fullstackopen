import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(
    ({ notificationReducer }) => notificationReducer[0]
  );

  const typeOfStyle = {
    normal: {
      border: "solid",
      padding: 10,
      borderWidth: 1,
      marginBottom: 20,
      borderColor: "#150000",
    },
    error: {
      border: "solid",
      padding: 10,
      borderWidth: 1,
      marginBottom: 20,
      borderColor: "#f50000",
    },
  };
  return (
    <div style={notification && typeOfStyle[notification.style]}>
      {notification && notification.text}
    </div>
  );
};

export default Notification;
