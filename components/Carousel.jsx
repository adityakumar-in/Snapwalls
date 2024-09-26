"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import styles from "@/app/styles/carousel.css";

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
    pauseOnHover: false,
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        <div className={styles.carouselItem}>
          <Image
            src="/images/cyberpunk.jpg"
            alt="cyberpunk"
            layout="fill"
            objectFit="cover"
            className={styles.carouselImage}
          />
          <div className={styles.carouselOverlay} />
          <div className={styles.carouselContent}>
            <h2 className="carousel-title">Cyberpunk</h2>
            <p className="carousel-content">
              Cyberpunk is a subgenre of science fiction in a dystopian future
              where technology is advanced but society is corrupt and
              oppressive.
            </p>
          </div>
        </div>

        <div className={styles.carouselItem}>
          <Image
            src="/images/spiderrman.jpg"
            alt="spiderman"
            layout="fill"
            objectFit="cover"
            className={styles.carouselImage}
          />
          <div className={styles.carouselOverlay} />
          <div className={styles.carouselContent}>
            <h2 className="carousel-title">Spiderman</h2>
            <p className="carousel-content">
              Spider-Man is a superhero appearing in American comic books
              published by Marvel Comics.
            </p>
          </div>
        </div>
        <div className={styles.carouselItem}>
          <Image
            src="/images/tanjiro3.png"
            alt="tanjiro3"
            layout="fill"
            objectFit="cover"
            className={styles.carouselImage}
          />
          <div className={styles.carouselOverlay} />
          <div className={styles.carouselContent}>
            <h2 className="carousel-title">Tanjiro</h2>
            <p className="carousel-content">
              Tanjiro Kamado is a kind-hearted and hardworking young man who
              dreams of becoming a demon slayer to save his sister, Nezuko,
              after she was turned into a demon.
            </p>
          </div>
        </div>
        <div className={styles.carouselItem}>
          <Image
            src="/images/animegirl.webp"
            alt="animegirl"
            layout="fill"
            objectFit="cover"
            className={styles.carouselImage}
          />
          <div className={styles.carouselOverlay} />
          <div className={styles.carouselContent}>
            <h2 className="carousel-title">Anime Girl</h2>
            <p className="carousel-content">Anime Girl is a fictional character from the anime series.</p>
          </div>
        </div>
        <div className={styles.carouselItem}>
          <Image
            src="/images/firewatch.jpg"
            alt="firewatch"
            layout="fill"
            objectFit="cover"
            className={styles.carouselImage}
          />
          <div className={styles.carouselOverlay} />
          <div className={styles.carouselContent}>
            <h2 className="carousel-title">Firewatch</h2>
            <p className="carousel-content">Firewatch around a fire</p>
          </div>
        </div>
        <div className={styles.carouselItem}>
          <Image
            src="/images/nature-1.jpg"
            alt="nature"
            layout="fill"
            objectFit="cover"
            className={styles.carouselImage}
          />
          <div className={styles.carouselOverlay} />
          <div className={styles.carouselContent}>
            <h2 className="carousel-title">Firewatch</h2>
            <p className="carousel-content">Firewatch around a fire</p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
