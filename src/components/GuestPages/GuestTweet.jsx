import React from "react";
import GuestComponent from "./GuestComponent";
import { icons } from "../../assets/icons";

function GuestTweets() {
  return (
    <GuestComponent
      title="Join the Conversation"
      subtitle="Real-time thoughts, trends, and talk — log in to see what people are saying."
      icon={<span className="p-4 w-full">{icons.Tweets}</span>}
    />
  );
}
export default GuestTweets;