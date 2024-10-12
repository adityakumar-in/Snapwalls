import React from "react";
import Carousel from "../components/Carousel";
import WallpaperLoader from '../components/getWallpapers';

export default function Home() {
  return (
    <div className="main">
      <Carousel />
      <div className="snapwalls-content-page-home">
        <WallpaperLoader />
      </div>
    </div>
  );
}
