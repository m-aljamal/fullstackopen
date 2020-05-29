import React, { useState } from "react";

const LoginForm = ({ getFormData }) => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getFormData(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
        <h3>Login to Application</h3>
      <div>
        <p>User Name:</p>
        <input
          type="text"
          value={formData.userName}
          name="userName"
          onChange={handleChange}
        />
      </div>
      <div>
        <p>Password:</p>
        <input
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
