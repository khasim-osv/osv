import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { SearchButton } from "../../common/styled-components";
import { yupSchema } from "../../utils/Yup.validation";

export interface IProps {
  formSubmit: (values: ISearchKey) => void;
  resetSearch: (values: ISearchKey) => void;
}

export interface ISearchKey {
  search: string;
}

const Search = (props: IProps) => {
  return (
    <div className="isFlex searchBox">
      <Formik
        initialValues={{ search: "" }}
        validationSchema={yupSchema.Search}
        onSubmit={(values: ISearchKey, { setSubmitting }) => {
          props.formSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form>
            <div className="formControl">
              <Field name="search" type="text" autoComplete="off" />
              {values.search && (
                <span
                  className="clearBtn icon-Close-outline-button"
                  onClick={() => {
                    setFieldValue("search", "");
                    props.resetSearch(values);
                  }}
                ></span>
              )}
              <div className="errorMessage">
                <ErrorMessage name="search" />
              </div>
            </div>
            <SearchButton type="submit">SEARCH</SearchButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Search;
