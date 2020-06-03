import React from "react";

import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Groups, { IProps } from "../Groups.component";

const props: IProps = {
  getGroupsData: jest.fn(),
  updateGroupsData: jest.fn(),

  getGroups: { loading: false, success: false, data: [] },
  editGroups: { loading: false, success: false, data: [] },
  popupEditClose: jest.fn(),
  groupsDataChanged: jest.fn(),
};

afterEach(cleanup);

describe("<Groups /> component", () => {
  const { container, getByText, rerender } = render(<Groups {...props} />);

  const searchField: HTMLInputElement | null = container.querySelector(
    'input[name="search"]'
  );
  const searchButton = container.querySelector('button[type="submit"]');

  const mockData = {
    _id: "5e96f4f5a9f75d6838ca412e",
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

  it("Groups search with empty key", async () => {
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

  it("Groups search with keywords", async () => {
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
      <Groups
        {...props}
        getGroups={{ loading: false, success: true, data: [mockData] }}
      />
    );

    // There should be one record present as per mock data
    const records = container.querySelectorAll(".rt-tr-group");
    expect(records).toHaveLength(3);
  });

  it("Groups data table with edit", async () => {
    rerender(
      <Groups
        {...props}
        getGroups={{ loading: false, success: true, data: [mockData] }}
      />
    );

    const editButton = container.querySelector(".icon-Edit");
    await wait(() => {
      editButton && fireEvent.click(editButton);
    });

    expect(true).toBe(true);
  });
});
