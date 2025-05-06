import React from "react";
import GuestComponent from "./GuestComponent";
import { icons } from "../../assets/icons";

function GuestVideo() {
  return (
    <GuestComponent
      title="Sign In to Watch This Video"
      subtitle="Just a bit of verification, and the video will be ready for you."
      icon={<span className="p-4 w-full">{icons.Youtube}</span>}
    />
  );
}

export default GuestVideo;