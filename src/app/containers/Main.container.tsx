import React from "react";
import {
  Route,
  withRouter,
  Switch,
  Redirect,
  RouteChildrenProps,
} from "react-router-dom";
import Navbar from "../common/navbar/Navbar.component";
import Login from "../components/login/Login.redux";
import Registration from "../components/registration/Registration.redux";
import MasterDataManagementComponent from "../components/master_data_management/MasterDataManagement.redux";

import CreateErrorCodes from "../components/master_data_management/error_codes/CreateErrorCodes.redux";
import CreateGroups from "../components/master_data_management/groups/CreateGroups.redux";
import CreateBanks from "../components/master_data_management/banks/CreateBanks.redux";
import Groups from "../components/master_data_management/groups/Groups.redux";
import Banks from "../components/master_data_management/banks/Banks.redux";
import UserProfileComponent from "../components/user_profiles/UserProfile.component";
import Modules from "../components/master_data_management/modules/Modules.redux";
import CreateModule from "../components/master_data_management/modules/CreateModule.redux";
import LicenceType from "../components/master_data_management/licence_type/Licenses.redux";
import CreateLicense from "../components/master_data_management/licence_type/CreateLicense.redux";
import ErrorCodes from "../components/master_data_management/error_codes/ErrorCodes.redux";
import Translations from "../components/master_data_management/translations/Translations.redux";
import Create from "../components/master_data_management/translations/Create.redux";

import AllProfiles from "../components/user_profiles/AllProfiles.component";
import CreateUserProfile from "../components/user_profiles/createUser/CreateUserProfile.redux";
import CreateRole from "../components/user_profiles/CreateRole.component";

import Header from "../components/header/Header.component";
import AllUserProfiles from "../components/user_profiles/all_user_profiles/AllUserProfiles.redux";
import UserManagement from "../components/user_profiles/user_management/UserManagement.redux";
import RoleManagement from "../components/user_profiles/role_management/RoleManagement.redux";
import "./Main.scss";
import "../assets/fonts/style.scss";
import "./toastr.scss";

let list = [
  { Id: 1, Name: "OVERVIEW", Link: "/overview" },
  { Id: 2, Name: "USER PROFILES", Link: "/userprofiles" },
  { Id: 3, Name: "MASTER DATA MANAGEMENT", Link: "/masterdata" },
  { Id: 4, Name: "REPORTS", Link: "/reports" },
];

const MainContainer = (props: RouteChildrenProps) => {
  return (
    <div>
      <div>
        <Header />
        {props.location.pathname !== "/login" &&
          props.location.pathname !== "/registration" && <Navbar List={list} />}
      </div>
      <main>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Login} exact />
          <Route path="/registration" component={Registration} exact />

          <MasterDataManagementComponent path="/masterdata">
            <Redirect to="/masterdata/groups/all" />
            <Switch>
              <Route path="/masterdata/groups/all" component={Groups} />
              <Route
                path="/masterdata/groups/CreateGroups"
                component={CreateGroups}
              />
              <Route path="/masterdata/banks/all" component={Banks} />
              <Route
                path="/masterdata/banks/CreateBanks"
                component={CreateBanks}
              />
              <Route path="/masterdata/modules/all" component={Modules} />
              <Route path="/masterdata/groups" component={Groups} />
              <Route path="/masterdata/CreateGroups" component={CreateGroups} />
              <Route path="/masterdata/banks" component={Banks} />
              <Route path="/masterdata/CreateBanks" component={CreateBanks} />
              <Route path="/masterdata/modules/all" component={Modules} />
              <Route
                path="/masterdata/modules/createModule"
                component={CreateModule}
              />
              <Route
                path="/masterdata/licencetype/all"
                component={LicenceType}
              />
              <Route
                path="/masterdata/licencetype/createLicense"
                component={CreateLicense}
              />
              <Route path="/masterdata/errorcodes/all" component={ErrorCodes} />
              <Route
                path="/masterdata/errorcodes/createErrorCodes"
                component={CreateErrorCodes}
              />
              <Route
                path="/masterdata/translations/all"
                component={Translations}
              />
              <Route
                path="/masterdata/translations/create"
                component={Create}
              />
            </Switch>
          </MasterDataManagementComponent>
          {/*<Route path="/userprofiles" component={AllUserProfiles} /> */}
          <UserProfileComponent path="/userprofiles/">
            <Redirect to="/userprofiles/allProfiles" />
            <Switch>
              <Route
                path="/userprofiles/allProfiles"
                component={AllUserProfiles}
              />
              <Route
                path="/userprofiles/usermanagement/:userProfileId?/:id?"
                render={(props) => <UserManagement {...props} />}
              />
              {/* <Route path="/userprofiles/allProfiles" component={AllProfiles} /> */}
              <Route
                path="/userprofiles/rolemanagement/:userProfileId?/:id?"
                render={(props) => <RoleManagement {...props} />}
              />
              <Route path="/userprofiles/allProfiles" component={AllProfiles} />
              <Route
                path="/userprofiles/addUser/:id?"
                component={CreateUserProfile}
              />
              <Route path="/userprofiles/addRole" component={CreateRole} />
            </Switch>
          </UserProfileComponent>
        </Switch>
      </main>
    </div>
  );
};

export default withRouter(MainContainer);
