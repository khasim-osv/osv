import React from "react";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen, wait, cleanup } from "./test-utils";
import { Route, Switch, Router } from "react-router-dom";
import Licenses from "../Licenses.redux";
import CreateModule from "../CreateModule.redux";

afterEach(cleanup);

describe("View Licenses page test cases", () => {
  test("data is displayed", async () => {
    render(<Licenses />);

    await wait(() => {
      //expect(screen.getByText(/Loading/i)).toBeNull();
      expect(screen.getByText(/BasicOne/i)).toBeInTheDocument();
    });
  });

  test("data is editable", async () => {
    const { container } = render(<Licenses />);

    const editIcon = container.querySelector(".icon-EditAfter");
    expect(editIcon).toBeInTheDocument();
  });

  test("pop-up to be displayed on click of edit", async () => {
    const { container } = render(<Licenses />);
    const editIcon = container.querySelector(".icon-EditAfter");

    let modal = container.querySelector(".modal");
    expect(modal).toBeNull();

    fireEvent.click(editIcon);

    modal = container.querySelector(".modal");
    expect(modal).toBeInTheDocument();
  });

  test("pop-up edited data should be updated on the page   ", async () => {
    const { container } = render(<Licenses />);

    const editIcon = container.querySelector(".icon-EditAfter");

    fireEvent.click(editIcon);

    const licenseName = container.querySelector('input[name="licenseName"]');
    const submitButton = container.querySelector('button[type="submit"]');

    await wait(() => {
      licenseName &&
        fireEvent.change(licenseName, {
          target: {
            value: "Platinum",
          },
        });
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });

    await wait(() => {
      render(<Licenses />);
    });

    await wait(() => {
      //expect(screen.getByText(/Loading/i)).toBeNull();
      // expect(screen.getByText(/Txn/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Platinum/i)).toBeTruthy();
    });
    // expect(props.getModulesData).toHaveBeenCalledTimes(1)
  });
});
