import React from "react";
import Carousel from "/components/Carousel";
import Wallpaper from "/components/Wallpaper";

export default function Home() {
  return (
    <div className="default-padding">
      <Carousel />
      <div className="">
        <Wallpaper />
      </div>
    </div>
  );
}
