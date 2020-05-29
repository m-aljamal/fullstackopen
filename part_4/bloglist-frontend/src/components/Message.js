import React from "react";

const Message = ({ message: { error, type } }) => {
  return (
    <div className={type }>
      {error}
    </div>
  );
};

export default Message;
