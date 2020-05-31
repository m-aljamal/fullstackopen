import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import ToggleForm from "./ToggleForm";
import Blog from "./Blog";

test("render title and author", () => {
  const blog = {
    title: "this title is from test",
    author: "this is the author",
  };
  const component = render(<Blog blog={blog} />);
  const div = component.container.querySelector(".blog");
  expect(div).toHaveTextContent("this title is from test");
  const author = component.container.querySelector(".author");
  expect(author).toHaveTextContent("this is the author");
});

describe("<ToggleForm />", () => {
  let component;

  beforeEach(() => {
    component = render(
      <ToggleForm label="show">
        <div className="testDiv" />
      </ToggleForm>
    );
  });

  test("renders its children", () => {
    expect(component.container.querySelector(".testDiv")).toBeDefined();
  });

  test("at start the children are not displayed", () => {
    const div = component.container.querySelector(".togglableContent");

    expect(div).toHaveStyle("display: none");
  });


  test("after clicking the button, children are displayed", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    const div = component.container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });
});
