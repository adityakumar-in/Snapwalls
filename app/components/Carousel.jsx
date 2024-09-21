"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import styles from "../styles/carousel.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    fade: true,
    pauseOnHover: true,
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        <div className={styles.carouselItem}>
          <Image
            src="/images/tanjiro.jpg"
            alt="tanjiro"
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
          <div className={styles.overlay} />
          <div className={styles.content}>
            <h2>Mavka</h2>
            <p>
              The already tumultuous lives of people are turned upside down.
            </p>
          </div>
        </div>

        <div className={styles.carouselItem}>
          <Image
            src="/images/tanjiro2.jpg"
            alt="tanjiro2"
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
          <div className={styles.overlay} />
          <div className={styles.content}>
            <h2>Slide 2</h2>
            <p>Another carousel item with a description.</p>
          </div>
        </div>
        <div className={styles.carouselItem}>
          <Image
            src="/images/tanjiro3.png"
            alt="tanjiro3"
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
          <div className={styles.overlay} />
          <div className={styles.content}>
            <h2>Slide 3</h2>
            <p>Another carousel item with a description.</p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
