import { connect } from "react-redux";
import CreateUserProfile from "./CreateUserProfile.component";
import { get_profileusers_data } from "../user_management/UserManagement.action";
import { Dispatch } from "redux";
import {
  get_pageData,
  save_companyInfo,
  save_signInInfo,
  twoStepSwitched,
  makeCompanyInfoEditable,
  makeSignInEditable,
  editBankAccount,
  makeWFManagementEditable,
  save_bankAccouts,
  saveWFManagement,
  saveCommunication,
  getUserProfileData,
  addBankAccount,
  closeBankForm,
  openBankForm,
  get_workflow_data,
  update_workflow_data,
  update_close,
} from "./CreateUserProfile.action";
import {
  ICompanyInfo,
  ISignIn,
  IBank,
  ICommunication,
  IWorkflowManagement,
  IReduxCreateUserProfileState,
  IWorkflowManagementData,
  IWorkflowManagementDetails,
} from "./CreateUserProfile.actionTypes";

export const mapStateToProps = (state: IReduxCreateUserProfileState) => {
  return {
    pageData: state.userProfile.createUserPageData,
    companyInfoData: state.userProfile.companyInfoData,
    signInInfoData: state.userProfile.signInInfoData,
    bankAccountsInfoData: state.userProfile.bankAccountsInfoData,
    workforceMngmntData: state.userProfile.workforceMngmntData,
    commmunicationData: state.userProfile.commmunicationData,
    roles: state.userProfile.roles,
    users: state.userProfile.users,
    getWorkflowData: state.userProfile.getWorkflowData,
    updateWorkflowData: state.userProfile.updateWorkflowData,
    getAllProfileUsersData: state.userProfile.getAllProfileUsers,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getPageData: () => {
      dispatch(get_pageData());
    },
    saveCompanyInfo: (payload: ICompanyInfo) => {
      dispatch(save_companyInfo(payload));
    },
    saveSignInInfo: (payload: ISignIn) => {
      dispatch(save_signInInfo(payload));
    },
    saveBankAccounts: (payload: IBank) => {
      dispatch(save_bankAccouts(payload));
    },
    saveWFManagement: (payload: IWorkflowManagement) => {
      dispatch(saveWFManagement(payload));
    },
    saveCommunication: (payload: ICommunication) => {
      dispatch(saveCommunication(payload));
    },
    makeCompanyInfoEditable: () => {
      dispatch(makeCompanyInfoEditable());
    },
    makeSignInEditable: () => {
      dispatch(makeSignInEditable());
    },
    editBankAccount: (payload: IBank) => {
      dispatch(editBankAccount(payload));
    },
    makeWFManagementEditable: (payload: IWorkflowManagement) => {
      dispatch(makeWFManagementEditable(payload));
    },
    getUserProfileData: (_id: string) => {
      dispatch(getUserProfileData(_id));
    },
    addBankAccount: () => {
      dispatch(addBankAccount());
    },
    closeBankForm: () => {
      dispatch(closeBankForm());
    },
    openBankForm: () => {
      dispatch(openBankForm());
    },
    getWorkflow: (userProfileId: string) => {
      dispatch(get_workflow_data(userProfileId));
    },
    updateWorkflow: (values: IWorkflowManagementDetails) => {
      dispatch(update_workflow_data(values));
    },
    updateClosed: () => dispatch(update_close()),
    getAllProfileUsers: (userProfileId: string) =>
      dispatch(get_profileusers_data(userProfileId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUserProfile as any);
