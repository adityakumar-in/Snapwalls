// app/components/Carousel.js
"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import styles from "../styles/carousel.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {/* First Slide */}
        <div className={styles.carouselItem}>
          <Image
            src="/images/tanjiro.jpg"
            alt="Mavka"
            layout="fill" // This makes the image fill the container
            objectFit="cover" // Makes sure the image covers the entire container while maintaining aspect ratio
            className={styles.image}
          />
          <div className={styles.content}>
            <h2>Mavka</h2>
            <p>
              The already tumultuous lives of people are turned upside down.
            </p>
          </div>
        </div>

        {/* Second Slide */}
        <div className={styles.carouselItem}>
          <Image
            src="/images/your-image-2.jpg"
            alt="Image 2"
            layout="fill" // Full width image
            objectFit="cover"
            className={styles.image}
          />
          <div className={styles.content}>
            <h2>Slide 2</h2>
            <p>Another carousel item with a description.</p>
          </div>
        </div>

        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default Carousel;
