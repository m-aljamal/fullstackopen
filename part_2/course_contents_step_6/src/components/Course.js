import React from "react";
import Header from "./Header";
import Content from "./Content";
import Sum from "./Sum";

const Course = ({ course }) => {
  const { name, parts } = course;
  const total = parts.map((part) => part.exercises).reduce((s, p) => s + p);

  return (
    <div>
      <Header courseName={name} />
      <Content parts={parts} />
      <Sum total={total} />
    </div>
  );
};

export default Course;
