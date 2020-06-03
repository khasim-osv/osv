import React from "react";
import SideNavbar from "./SideNavbar.component";
import "../UserProfiles.scss";
import CompanyInfo from "./CompanyInfo.component";
import SignInSecurity from "./SignInSecurity.component";
import BankAccounts from "./BankAccounts.component";
import RoleManagement from "./RoleManagement.component";
import UserManagement from "./UserManagement.component";
import DataPrivacy from "./DataPrivacy.component";
import WorkflowMngmnt from "./WorkflowMngmnt.component";
import Communications from "./Communications.component";
import { RouteComponentProps } from "react-router";
import isEmpty from "lodash.isempty";

import {
  IPageData,
  ICompanyInfoState,
  ISignInState,
  IBankState,
  ICompanyInfo,
  ICompanyInfoSelectField,
  ISignIn,
  IBank,
  SideMenuList,
  ICommunication,
  IRole,
  IUser,
  IWorkflowManagementDetails,
  IWorkflowManagementData,
  ICommunicationState,
  IWorkflowManagementState,
} from "./CreateUserProfile.actionTypes";
import { IProfileUsersData } from "../user_management/UserManagement.actionTypes";

export interface IProps {
  saveCompanyInfo: (values: ICompanyInfo) => void;
  getPageData: () => void;
  getUserProfileData: (_id: string) => void;
  saveClosed: () => void;
  pageData: IPageData;
  roles: IRole[];
  users: IUser[];
  companyInfoData: ICompanyInfoState;
  signInInfoData: ISignInState;
  bankAccountsInfoData: IBankState;
  workforceMngmntData: IWorkflowManagementState;
  saveSignInInfo: (values: ISignIn) => void;
  saveBankAccounts: (values: IBank) => void;
  saveCommunication: (payload: ICommunication) => void;
  commmunicationData: ICommunicationState;
  makeCompanyInfoEditable: () => void;
  makeSignInEditable: () => void;
  editBankAccount: (bank: IBank) => void;
  makeWFManagementEditable: () => void;
  addBankAccount: () => void;
  closeBankForm: () => void;
  openBankForm: () => void;
  getWorkflow: (userProfieId: string) => void;
  getWorkflowData: IWorkflowManagementData;
  updateWorkflow: (values: IWorkflowManagementDetails) => void;
  updateWorkflowData: IWorkflowManagementData;
  updateClosed: () => void;
  getAllProfileUsers: (userProfileId: string) => void;
  getAllProfileUsersData: IProfileUsersData;
}
export interface IState {
  sideMenuList: [{ Id: number; Name: string; Link: string }];
  twoStepSwitched: (checked: boolean) => void;
}

export default class CreateUserProfileComponent extends React.Component<
  IProps & RouteComponentProps<{ id: string }>
> {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getUserProfileData(this.props.match.params.id);
    } else {
      this.props.getPageData();
    }
  }

  saveSignInInfo = (payload: ISignIn) => {
    payload.userProfileId = this.props.companyInfoData._id;
    this.props.saveSignInInfo(payload);
  };

  saveBankAccounts = (payload: IBank) => {
    payload.userProfileId = this.props.companyInfoData._id;
    this.props.saveBankAccounts(payload);
  };
  saveCommunication = (payload: ICommunication) => {
    payload.userProfileId = this.props.companyInfoData._id;
    this.props.saveCommunication(payload);
  };

  render() {
    const { licenses, groups, banks, categories } = this.props.pageData;
    const userProfileId = this.props.companyInfoData._id;
    return (
      <div className="wrapper">
        <SideNavbar list={SideMenuList} />

        <div className="content">
          <div id="companyInfo">
            <CompanyInfo
              groups={groups}
              licenses={licenses}
              saveCompanyInfo={this.props.saveCompanyInfo}
              companyInfoData={this.props.companyInfoData}
              makeCompanyInfoEditable={this.props.makeCompanyInfoEditable}
              //	history={this.props.history}
            ></CompanyInfo>
          </div>
          <div id="signInSecurity">
            <SignInSecurity
              disabled={isEmpty(userProfileId)}
              saveSignInInfo={this.saveSignInInfo}
              signInInfoData={this.props.signInInfoData}
              makeSignInEditable={this.props.makeSignInEditable}
            ></SignInSecurity>
          </div>
          <div id="bankAccounts">
            <BankAccounts
              disabled={isEmpty(userProfileId)}
              saveBankAccounts={this.saveBankAccounts}
              bankAccountsData={this.props.bankAccountsInfoData}
              editBankAccount={this.props.editBankAccount}
              banks={banks}
              addBankAccount={this.props.addBankAccount}
              closeBankForm={this.props.closeBankForm}
              openBankForm={this.props.openBankForm}
            ></BankAccounts>
          </div>
          <div id="roleManagement">
            <RoleManagement
              disabled={isEmpty(userProfileId)}
              userProfileId={userProfileId}
              roles={this.props.roles}
            ></RoleManagement>
          </div>
          <div id="workflowManagement">
            <WorkflowMngmnt
              disabled={this.props.companyInfoData._id ? false : true}
              categories={categories}
              makeWFManagementEditable={this.props.makeWFManagementEditable}
              workforceMngmntData={this.props.workforceMngmntData}
              getWorkflowData={this.props.getWorkflowData}
              getWorkflow={this.props.getWorkflow}
              updateWorkflow={this.props.updateWorkflow}
              updateWorkflowData={this.props.updateWorkflowData}
              updateClosed={this.props.updateClosed}
              getAllProfileUsers={this.props.getAllProfileUsers}
              getAllProfileUsersData={this.props.getAllProfileUsersData}
              match={this.props.match}
            ></WorkflowMngmnt>
          </div>
          <div id="userManagement">
            <UserManagement
              disabled={isEmpty(userProfileId)}
              userProfileId={userProfileId}
              roles={this.props.roles}
              users={this.props.users}
            ></UserManagement>
          </div>
          <div id="communications">
            <Communications
              disabled={isEmpty(userProfileId)}
              email={this.props.signInInfoData.email}
              phoneNumber={this.props.signInInfoData.phone}
              communication={this.props.companyInfoData.communication}
              phCode={this.props.signInInfoData.phCode}
              saveCommunication={this.saveCommunication}
              commmunicationData={this.props.commmunicationData}
            ></Communications>
          </div>
          <div id="dataPrivacy">
            <DataPrivacy></DataPrivacy>
          </div>
        </div>
      </div>
    );
  }
}
