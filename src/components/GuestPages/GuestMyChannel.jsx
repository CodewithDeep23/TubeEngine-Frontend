import React from "react";
import GuestComponent from "./GuestComponent";
import { icons } from "../../assets/icons";

function GuestMyChannel() {
  return (
    <GuestComponent
      title="Start Creating, Start Sharing"
      subtitle="Build your space, upload videos, and express yourself — sign in to begin."
      icon={
        <span className="w-full h-full flex items-center p-2">
          {icons.MyContent}
        </span>
      }
      route="/"
    />
  );
}

export default GuestMyChannel;