import React from "react";

function Alert({ message, messageType }) {
  return messageType === "success" ? (
    <div className="alert alert-success alert-dismissible fade show" role="alert">
      {message}
    </div>
  ) : (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      {message}
    </div>
  );
}

export default (Alert);