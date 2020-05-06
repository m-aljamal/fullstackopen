import React from "react";

const Message = ({ message: { message, type } }) => {
  return (
    <div className={type === "add" ? "add" : "update" ? "update" : "remove"}>
      {message}
    </div>
  );
};

export default Message;
