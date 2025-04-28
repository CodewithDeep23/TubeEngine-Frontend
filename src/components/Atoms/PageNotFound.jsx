import React from "react";
import pageNot from "../../assets/pageNot.gif";
import { Link } from "react-router-dom";
import { Button } from "../index";
function PageNotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center overflow-y-auto bg-[#121212] text-white">
      <span className="w-96 h-96 rounded-xl overflow-hidden">
        <img src={pageNot} className=" " alt="404 not found" />
      </span>
      <h1 className="text-2xl">
        <Button className="rounded-sm mt-5">
          <Link to={"/"}>Return to Home</Link>
        </Button>
      </h1>
    </div>
  );
}

export default PageNotFound;