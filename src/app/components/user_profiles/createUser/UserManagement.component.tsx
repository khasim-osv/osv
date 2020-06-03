import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import isEmpty from "lodash.isempty";
import { IUser, IRole } from "./CreateUserProfile.actionTypes";
export interface IProps {
  userProfileId: string | undefined;
  users: IUser[];
  disabled: boolean;
  roles: IRole[];
}

const UserManagement = (props: IProps) => {
  return (
    <div
      className="isFlex"
      style={props.disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
      <div className="modal">
        <div className="editTitle">User management</div>
        <span>Manage user and add admins,accountants and other users.</span>
        roles and permissions
        <p>
          {" "}
          <Link to={`/userprofiles/usermanagement/${props.userProfileId}`}>
            + Add more users
          </Link>
        </p>
        <table style={{ width: "100%" }}>
          <tbody>
            {!isEmpty(props.users) &&
              props.users.map((user, i) => {
                let userRole =
                  props.roles &&
                  props.roles.find((role) => role._id === user.roleName);
                return (
                  <tr key={user._id}>
                    <td>User {i + 1}</td>
                    <td>{user.email}</td>
                    {/* <td>{user.roleName}</td> */}
                    <td>{userRole && userRole.roleName}</td>
                    <td>
                      <Link
                        to={`/userprofiles/usermanagement/${props.userProfileId}/${user._id}`}
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

export default React.memo(UserManagement);
