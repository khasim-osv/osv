import React from "react";
import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Login, { IProps } from "../Login.component";

const props: IProps = {
  onLogin: jest.fn(),
  user: {
    loading: false,
    success: false,
    message: "",
    data: { userName: "", password: "" },
  },
};

afterEach(cleanup);

describe("<Login /> component", () => {
  const { container, getByText, rerender } = render(
    <BrowserRouter>
      <Login {...props} />
    </BrowserRouter>
  );

  const userName: HTMLInputElement | null = container.querySelector(
    'input[name="userName"]'
  );
  const password: HTMLInputElement | null = container.querySelector(
    'input[name="password"]'
  );
  const loginButton = container.querySelector('button[type="submit"]');

  it("Login with invalid username and password", async () => {
    await wait(() => {
      userName &&
        fireEvent.change(userName, {
          target: {
            value: "",
          },
        });
    });

    await wait(() => {
      password &&
        fireEvent.change(password, {
          target: {
            value: "",
          },
        });
    });

    await wait(() => {
      loginButton && fireEvent.click(loginButton);
    });

    rerender(
      <BrowserRouter>
        <Login
          {...props}
          user={{ success: false, message: "Invalid username and password" }}
        />
      </BrowserRouter>
    );

    expect(getByText("Invalid username and password")).toBeInTheDocument();
  });

  it("Login successfull", async () => {
    await wait(() => {
      userName &&
        fireEvent.change(userName, {
          target: {
            value: "khasim@onesingleview.com",
          },
        });
    });

    await wait(() => {
      password &&
        fireEvent.change(password, {
          target: {
            value: "12345",
          },
        });
    });

    await wait(() => {
      loginButton && fireEvent.click(loginButton);
    });

    rerender(
      <BrowserRouter>
        <Login user={{ success: true }} />
      </BrowserRouter>
    );

    expect(window.location.pathname).toEqual("/masterdata");
  });
});
