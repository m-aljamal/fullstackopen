import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <div>
      <Header courseName={name} />
      <Content parts={parts} />
    </div>
  );
};

export default Course;
