import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IRole } from "./CreateUserProfile.actionTypes";
import isEmpty from "lodash.isempty";
export interface IProps {
  userProfileId: string | undefined;
  roles: IRole[];
  disabled: boolean;
}

const RoleManagement = (props: IProps) => {
  return (
    <div
      className="isFlex"
      style={props.disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
      <div className="modal">
        <div className="editTitle">Role management</div>
        <span>Manage user roles and permissions</span>
        <div style={{ marginLeft: "600px", color: "blue" }}>
          {" "}
          <Link
            style={{ color: "blue" }}
            to={`/userprofiles/rolemanagement/${props.userProfileId}`}
          >
            Create
          </Link>
        </div>

        <table style={{ width: "100%" }}>
          <tbody>
            {!isEmpty(props.roles) &&
              props.roles.map((role, i) => {
                return (
                  <tr key={role._id}>
                    <td>Role {i + 1}</td>
                    <td>{role.roleName}</td>
                    <td>
                      <Link
                        style={{ color: "blue" }}
                        to={`/userprofiles/rolemanagement/${props.userProfileId}/${role._id}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
  //}
};

export default React.memo(RoleManagement);
