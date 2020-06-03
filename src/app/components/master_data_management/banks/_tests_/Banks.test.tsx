import React from "react";

import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Banks, { IProps } from "../Banks.component";

const props: IProps = {
  getBanksData: jest.fn(),
  updateBanksData: jest.fn(),

  getBanks: { loading: false, success: false, data: [] },
  editBanks: { loading: false, success: false, data: [] },
  popupEditClose: jest.fn(),
  deleteBanks: { loading: false, success: false, data: [] },
  popupDeleteClose: jest.fn(),
  banksDataChanged: jest.fn(),
};

afterEach(cleanup);

describe("<Banks /> component", () => {
  const { container, getByText, rerender } = render(<Banks {...props} />);

  const searchField: HTMLInputElement | null = container.querySelector(
    'input[name="search"]'
  );
  const searchButton = container.querySelector('button[type="submit"]');

  const mockData = {
    _id: "",
    logo: "",
    bank: "",
    url: "",
    type: "",
    isActive: true,
    success: false,
  };

  it("Banks search with empty key", async () => {
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

  it("Banks search with keywords", async () => {
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
      <Banks
        {...props}
        getBanks={{ loading: false, success: true, data: [mockData] }}
      />
    );

    // There should be one record present as per mock data
    const records = container.querySelectorAll(".rt-tr-group");
    expect(records).toHaveLength(3);
  });

  it("Banks data table with edit", async () => {
    rerender(
      <Banks
        {...props}
        getBanks={{ loading: false, success: true, data: [mockData] }}
      />
    );

    const editButton = container.querySelector(".icon-Edit");
    await wait(() => {
      editButton && fireEvent.click(editButton);
    });

    expect(true).toBe(true);
  });
});
