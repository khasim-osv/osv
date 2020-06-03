import React from "react";
import SideNavbar from "../../common/sidenavbar/SideNavbar.component";
import "./MasterDataManagement.scss";

export interface IProps {
  path: string;
  children: React.ReactNode;
}

export interface IState {
  sideMenuList: any[];
}

export default class MasterDataManagementComponent extends React.Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      sideMenuList: [
        {
          Id: 1,
          Name: "Groups",
          Link: props.path + "/groups",
          subMenu: [
            { Id: 1, Name: "All", Link: props.path + "/groups/all" },
            {
              Id: 2,
              Name: "Create Group",
              Link: props.path + "/groups/creategroups",
            },
          ],
        },
        {
          Id: 2,
          Name: "Banks",
          Link: props.path + "/banks",
          subMenu: [
            { Id: 1, Name: "All", Link: props.path + "/banks/all" },
            {
              Id: 2,
              Name: "Add Bank",
              Link: props.path + "/banks/CreateBanks",
            },
          ],
        },

        {
          Id: 3,
          Name: "Modules",
          Link: props.path + "/modules",
          subMenu: [
            { Id: 1, Name: "All", Link: props.path + "/modules/all" },
            {
              Id: 2,
              Name: "Create new module",
              Link: props.path + "/modules/createModule",
            },
          ],
        },
        {
          Id: 4,
          Name: "Licence Type",
          Link: props.path + "/licencetype",
          subMenu: [
            { Id: 1, Name: "All", Link: props.path + "/licencetype/all" },
            {
              Id: 2,
              Name: "Create new license",
              Link: props.path + "/licencetype/createLicense",
            },
          ],
        },
        {
          Id: 5,
          Name: "Error codes",
          Link: props.path + "/errorcodes",
          subMenu: [
            { Id: 1, Name: "All", Link: props.path + "/errorcodes/all" },
            {
              Id: 2,
              Name: "Create error code",
              Link: props.path + "/errorcodes/createErrorCodes",
            },
          ],
        },
        {
          Id: 6,
          Name: "Translations",
          Link: props.path + "/translations",
          subMenu: [
            { Id: 1, Name: "All", Link: props.path + "/translations/all" },
            {
              Id: 2,
              Name: "Create new translations",
              Link: props.path + "/translations/create",
            },
          ],
        },
      ],
    };
  }

  render() {
    const { sideMenuList } = this.state;
    return (
      <div className="translationWrapper">
        <SideNavbar List={sideMenuList} />
        <div className="translationContent">{this.props.children}</div>
      </div>
    );
  }
}
