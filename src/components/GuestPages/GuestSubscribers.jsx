import React from "react";
import GuestComponent from "./GuestComponent";
import { icons } from "../../assets/icons";

function GuestSubscribers() {
  return (
    <GuestComponent
      title="See Who’s Tuning In"
      subtitle="Want to grow your following? Sign in to view and engage with your subscribers."
      icon={<span className="p-4 w-full">{icons.Subscribers}</span>}
    />
  );
}
export default GuestSubscribers;