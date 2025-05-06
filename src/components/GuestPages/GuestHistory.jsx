import React from "react";
import GuestComponent from "./GuestComponent";
import { icons } from "../../assets/icons";
function GuestHistory() {
  return (
    <GuestComponent
      title="Rewind Your Viewing Journey"
      subtitle="Track your watched content by signing in — your history, your way."
      icon={icons.history}
    />
  );
}

export default GuestHistory;