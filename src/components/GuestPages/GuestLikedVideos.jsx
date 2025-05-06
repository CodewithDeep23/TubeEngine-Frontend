import React from "react";
import GuestComponent from "./GuestComponent";
import { icons } from "../../assets/icons";

function GuestLikedVideos() {
  return (
    <GuestComponent
      title="Your Personal Playlist Starts Here"
      subtitle="Like what you see? Sign in to save and revisit your favorite videos anytime."
      icon={<span className="w-full h-full flex items-center p-4 pb-5">{icons.Like}</span>}
    />
  );
}
export default GuestLikedVideos;