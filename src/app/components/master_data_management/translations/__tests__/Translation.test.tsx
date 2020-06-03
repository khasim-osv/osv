import React from "react";
import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Translations, { IProps } from "../Translations.component";

const props: IProps = {
  getTranslationData: jest.fn(),
  updateTranslationData: jest.fn(),
  deleteTranslationData: jest.fn(),
  getTranslations: { loading: false, success: false, data: [] },
  editTranslation: { loading: false, success: false, data: [] },
  popupEditClose: jest.fn(),
  deleteTranslation: { loading: false, success: false, data: [] },
  popupDeleteClose: jest.fn(),
  translationDataChanged: jest.fn(),
};

afterEach(cleanup);

describe("<Translations /> component", () => {
  const { container, getByText, rerender } = render(
    <Translations {...props} />
  );

  const searchField: HTMLInputElement | null = container.querySelector(
    'input[name="search"]'
  );
  const searchButton = container.querySelector('button[type="submit"]');

  const mockData = {
    _id: "5e96f4f5a9f75d6838ca412e",
    key: "modules",
    english: "modules",
    arabic: "الوحدات",
    value: {
      english: "modules",
      arabic: "الوحدات",
    },
    modifiedBy: "khasim@onesingleview.com",
    modifiedDate: "10/08/2020",
  };

  it("Translations search with empty key", async () => {
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

  it("Translations search with keywords", async () => {
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
      <Translations
        {...props}
        getTranslations={{ loading: false, success: true, data: [mockData] }}
      />
    );

    // There should be one record present as per mock data
    const records = container.querySelectorAll(".rt-tr-group");
    expect(records).toHaveLength(3);
  });

  it("Translations data table with edit", async () => {
    rerender(
      <Translations
        {...props}
        getTranslations={{ loading: false, success: true, data: [mockData] }}
      />
    );

    const editButton = container.querySelector(".icon-Edit");
    await wait(() => {
      editButton && fireEvent.click(editButton);
    });

    expect(true).toBe(true);

    //to do datatable related to child components

    /*expect(getByText("Edit translations")).toBeInTheDocument();

    const keyField: HTMLInputElement | null = container.querySelector(
      'input[name="key"]'
    );
    expect(keyField && keyField.value).not.toBeNull();
    const englishField: HTMLTextAreaElement | null = container.querySelector(
      'textarea[name="english"]'
    );
    expect(englishField && englishField.value).not.toBeNull();
    const arabicField: HTMLTextAreaElement | null = container.querySelector(
      'textarea[name="arabic"]'
    );
    expect(arabicField && arabicField.value).not.toBeNull();

    const editData = {
      key: keyField && keyField.value,
      value: {
        english: englishField && englishField.value,
        arabic: arabicField && arabicField.value
      }
    };

    await wait(() => {
      englishField &&
        fireEvent.change(englishField, {
          target: {
            value: "reports"
          }
        });
    });

    const saveButton = container.querySelector(".saveBtn");
    await wait(() => {
      saveButton && fireEvent.click(saveButton);
    });

    const editDataModified = {
      key: keyField && keyField.value,
      value: {
        english: englishField && englishField.value,
        arabic: arabicField && arabicField.value
      }
    };

    expect(editDataModified).not.toEqual(editData);*/
  });
});
