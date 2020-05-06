import React from "react";

const Message = ({ message: { message, type } }) => {
  return (
    <div className={type }>
      {message}
    </div>
  );
};

export default Message;
