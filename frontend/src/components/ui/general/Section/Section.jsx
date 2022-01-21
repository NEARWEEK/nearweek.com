import React from "react";
import SectionHeader from "./SectionHeader/SectionHeader";

const Section = (props) => {
  return (
    <div className="section">
      <SectionHeader title={props.title} link={props.link} />
      {props.children}
    </div>
  );
};

export default Section;
