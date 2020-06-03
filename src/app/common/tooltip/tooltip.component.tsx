import React from "react";
import "./tooltip.scss";

export interface IToolTipProps {
  title: string;
  header: string;
  content: JSX.Element[];
}

export const Tooltip = (props: IToolTipProps) => {
  return (
    <div className="tooltip">
      <div className="tooltipTitle">{props.title}</div>
      <div className="tooltipContent">
        <div className="tooltipHeader">{props.header}</div>
        <div className="tooltipBody">{props.content}</div>
      </div>
    </div>
  );
};
