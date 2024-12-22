import React from "react";
import Carousel from "/components/Carousel";
import GetWallpapers from '/components/GetWallpapers';

export default function Home() {
  return (
    <div className="default-padding">
      <Carousel />
      <div className="">
        <GetWallpapers />
      </div>
    </div>
  );
}
