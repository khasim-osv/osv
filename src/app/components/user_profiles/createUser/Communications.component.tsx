import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Switch from "react-switch";
import {
  ICommunication,
  ICommunicationState,
} from "./CreateUserProfile.actionTypes";

interface IProps {
  phoneNumber: string;
  email: string;
  phCode: string;
  saveCommunication: (payload: ICommunication) => void;
  commmunicationData: ICommunicationState;
  communication: boolean;
  disabled: boolean;
}

let conditions = {
  disabled: true,
};

const Communications = (props: IProps) => {
  const handleChange = (checked: boolean) => {
    props.saveCommunication({ enableCommunication: checked });
  };

  if (props.phoneNumber) {
    delete conditions.disabled;
  }
  if (props.commmunicationData.saved === false) {
    toast.error("Something wrong with the API...!", {
      containerId: "communications",
    });
  }
  if (props.commmunicationData.saved === true) {
    toast.success("communications successfully updated", {
      containerId: "communications",
    });
  }
  return (
    <>
      <div
        className="isFlex"
        style={props.disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
      >
        <div className="modal">
          <div className="editTitle">Communications</div>
          <span>Set the rules of our engagement with you</span>

          <div className="communicationContent">
            <span style={{ fontWeight: "bold" }}>Phone call</span>
          </div>
          <div>
            {props.phCode && (
              <span style={{ width: "100%", color: "blue" }}>
                ({props.phCode}){props.phoneNumber}
              </span>
            )}
          </div>
          <div className="communicationContent">
            <span style={{ fontWeight: "bold" }}>Phone communications</span>
          </div>
          <div>
            <span style={{ width: "100%" }}>
              <Switch onChange={handleChange} checked={props.communication} />
            </span>
            <br />
            <span>
              By turning this ON,I agree to receive promotional automated
              messages and calls to this phone number from Intuit. Consent is
              not a condition of purchase.You will still get important
              communications specific to your account ,transactions or
              enquiries.
            </span>
          </div>
          <div className="">
            <span style={{ fontWeight: "bold" }}>Email</span>
            <span style={{ marginLeft: "20px", color: "blue" }}>
              {props.email}
            </span>
            <br />
            <span>
              You will get important communications specific to your account
              ,transactions or enquiries.
            </span>
          </div>
        </div>
      </div>
      <ToastContainer
        enableMultiContainer
        containerId={"communications"}
        className="toastContainer"
        toastClassName="toastBody"
        hideProgressBar={true}
      />
    </>
  );
  //}
};

export default Communications;
