import React from "react";
import {Link} from 'react-router-dom'

export interface IProps {}

const AllProfiles = (props: IProps) => {
  return (
    <>
     <div style={{marginLeft:'400px'}}>
       <h2>All User Profiles</h2>
       <Link to="/userprofiles/addUser">
              Add user profile
            </Link>
        </div>    
     </> 
      );
};

export default AllProfiles;
