import React from "react";
import Carousel from "../components/Carousel";
import WallpaperLoader from '../components/getWallpapers';

export default function Home() {
  return (
    <div className="default-padding">
      <Carousel />
      <div className="">
        <WallpaperLoader />
      </div>
    </div>
  );
}
