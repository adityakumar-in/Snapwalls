import React from 'react'
import Carousel from "/components/Carousel";
import Wallpaper from "/components/Wallpaper";

const page = () => {
  return (
    <div className='default-padding'>
      <Carousel />
      <div className="">
        <Wallpaper />
      </div>
    </div>
  )
}

export default page
