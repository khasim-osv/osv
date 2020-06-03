import React from "react";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen, wait, cleanup } from "./test-utils";
import { Route, Switch, Router } from "react-router-dom";
import Modules from "../Modules.redux";
import CreateModule from "../CreateModule.redux";
import { toast, ToastContainer } from "react-toastify";

afterEach(cleanup);

describe("All Modules page test cases", () => {
  test("data is displayed", async () => {
    render(<Modules />);

    await wait(() => {
      //expect(screen.getByText(/Loading/i)).toBeNull();
      expect(screen.getByText(/Payroll123/i)).toBeInTheDocument();
    });
  });

  test("data is editable", async () => {
    const { container } = render(<Modules />);

    const editIcon = container.querySelector(".icon-Edit");
    expect(editIcon).toBeInTheDocument();
  });

  test("pop-up to be displayed on click of edit", async () => {
    const { container } = render(<Modules />);
    const editIcon = container.querySelector(".icon-Edit");

    let modal = container.querySelector(".modal");
    expect(modal).toBeNull();

    fireEvent.click(editIcon);

    modal = container.querySelector(".modal");
    expect(modal).toBeInTheDocument();
  });

  test("pop-up edited data should be updated on the page   ", async () => {
    const { container } = render(<Modules />);

    const editIcon = container.querySelector(".icon-Edit");

    fireEvent.click(editIcon);

    const moduleName = container.querySelector('input[name="moduleName"]');
    const submitButton = container.querySelector('button[type="submit"]');

    await wait(() => {
      moduleName &&
        fireEvent.change(moduleName, {
          target: {
            value: "Txn history",
          },
        });
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });

    await wait(() => {
      render(<Modules />);
    });

    await wait(() => {
      //expect(screen.getByText(/Loading/i)).toBeNull();
      // expect(screen.getByText(/Txn/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Txn/i)).toBeTruthy();
    });
    // expect(props.getModulesData).toHaveBeenCalledTimes(1)
  });
});

describe("Create Module Page", () => {
  test("new module should be created", async () => {
    function App() {
      return (
        <div>
          <Switch>
            <Route exact path="/masterdata/modules/all" component={Modules} />
            <Route
              path="/masterdata/modules/createModule"
              //component={CreateModule}
              component={() => (
                <>
                  <CreateModule></CreateModule>
                  <ToastContainer
                    className="toastContainer"
                    toastClassName="toastBody"
                    hideProgressBar={true}
                  />
                </>
              )}
            />
          </Switch>
        </div>
      );
    }

    const history = createMemoryHistory();
    history.push("/masterdata/modules/createModule");

    /* const { container } = 
    render( <CreateModule /> );*/

    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    const moduleName = container.querySelector('input[name="moduleName"]');

    const submitButton = container.querySelector('button[type="submit"]');
    // const submitButton = container.querySelector('.submit');

    await wait(() => {
      fireEvent.change(moduleName, {
        target: {
          value: "newValue",
        },
      });
    });

    await wait(() => {
      fireEvent.click(submitButton);
    });

    /* await wait(() => {
      render(<Modules />);
    }); */

    await wait(() => {
      history.push("/masterdata/modules/all");
    });

    await wait(() => {
      //expect(screen.getByText(/Loading/i)).toBeNull();

      expect(history.location.pathname).toEqual("/masterdata/modules/all");
      // expect(screen.getByText(/newValue/i)).toBeInTheDocument();
      expect(screen.getByText(/Txn/i)).toBeInTheDocument();
    });
  });
});
