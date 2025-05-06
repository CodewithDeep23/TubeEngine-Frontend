import React from "react";
import GuestComponent from "./GuestComponent";
import { icons } from "../../assets/icons";

function GuestAdmin() {
  return (
    <GuestComponent
      title="Take Control of Your Channel"
      subtitle="From content to comments — sign in to manage everything in one place."
      icon={<span className="">{icons.Admin}</span>}
    />
  );
}

export default GuestAdmin;
