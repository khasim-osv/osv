import React from "react";

const DataPrivacy = () => {
  return (
    <div className="isFlex">
      <div className="modal">
        <div className="editTitle">Data & Privacy</div>
        <span>Manage your data</span>

        <div className="dataPrivacyContent">
          <span style={{ fontWeight: "bold" }}>Download</span>
          <span>Download your single view data</span>
          <span>Continue</span>
        </div>
        <div className="dataPrivacyContent">
          <span style={{ fontWeight: "bold" }}>Delete</span>
          <span>Delete your single view data</span>
          <span>Continue</span>
        </div>
      </div>
    </div>
  );
};

export default DataPrivacy;
