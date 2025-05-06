import React from "react";
import GuestComponent from "./GuestComponent";
import { icons } from "../../assets/icons";

function GuestSubscription() {
  return (
    <GuestComponent
      title="Follow What Matters to You"
      subtitle="Stay close to creators you love — sign in and subscribe for updates."
      icon={icons.Subscription}
    />
  );
}

export default GuestSubscription;