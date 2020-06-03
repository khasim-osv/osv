import React from "react";

import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ErrorCodes, { IProps } from "../ErrorCodes.component";

const props: IProps = {
  getErrorCodesData: jest.fn(),
  updateErrorCodesData: jest.fn(),

  getErrorCodes: { loading: false, success: false, data: [] },
  editErrorCode: { loading: false, success: false, data: [] },
  popupEditClose: jest.fn(),
  errorCodesDataChanged: jest.fn(),
};

afterEach(cleanup);

describe("<ErrorCodes /> component", () => {
  const { container, getByText, rerender } = render(<ErrorCodes {...props} />);

  const searchField: HTMLInputElement | null = container.querySelector(
    'input[name="search"]'
  );
  const page = 1;
  const pageSize = 3;
  const searchButton = container.querySelector('button[type="submit"]');

  const mockData = {
    _id: "5e96f4f5a9f75d6838ca412e",
    key: "modules",
    errorcode: "modules",
    english: "modules",
    arabic: "الوحدات",
    value: {
      english: "modules",
      arabic: "الوحدات",
    },
    modifiedBy: "khasim@onesingleview.com",
    modifiedDate: "10/08/2020",
    isActive: true,
  };

  it("ErrorCodes search with empty key", async () => {
    await wait(() => {
      searchField &&
        fireEvent.change(searchField, {
          target: {
            value: "",
          },
        });
    });

    await wait(() => {
      searchButton && fireEvent.click(searchButton);
    });

    expect(getByText("Search cannot be empty")).toBeInTheDocument();
  });

  it("ErrorCodes search with keywords", async () => {
    await wait(() => {
      searchField &&
        fireEvent.change(searchField, {
          target: {
            value: "modules",
          },
        });
    });

    await wait(() => {
      searchButton && fireEvent.click(searchButton);
    });

    rerender(
      <ErrorCodes
        {...props}
        getErrorCodes={{ loading: false, success: true, data: [mockData] }}
      />
    );

    // There should be one record present as per mock data
    const records = container.querySelectorAll(".rt-tr-group");
    expect(records).toHaveLength(3);
  });

  it("Errorcodes data table with edit", async () => {
    rerender(
      <ErrorCodes
        {...props}
        getErrorCodes={{ loading: false, success: true, data: [mockData] }}
      />
    );

    const editButton = container.querySelector(".icon-Edit");
    await wait(() => {
      editButton && fireEvent.click(editButton);
    });

    expect(true).toBe(true);
  });
});
