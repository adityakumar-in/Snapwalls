"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import "@/app/styles/carousel.css";

const Carousel = () => {
  const [active, setActive] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const images = [
    {
      src: "/images/spiderrman.jpg",
      alt: "spiderman",
      title: "Spider-Man: Across the Spider-Verse",
      description:
        "Miles Morales returns for another thrilling adventure across dimensions.",
      category: "Movies & Animation",
    },
    {
      src: "/images/cyberpunk.jpg",
      alt: "cyberpunk",
      title: "Cyberpunk Night City",
      description:
        "A neon-lit futuristic cityscape from the world of Cyberpunk 2077.",
      category: "Gaming",
    },
    {
      src: "/images/tanjiro3.png",
      alt: "tanjiro",
      title: "Demon Slayer: Tanjiro",
      description:
        "The determined demon slayer Tanjiro Kamado in his iconic pose.",
      category: "Anime",
    },
    {
      src: "/images/animegirl.webp",
      alt: "anime-girl",
      title: "Anime Art Style",
      description: "Beautiful artistic representation in modern anime style.",
      category: "Anime Art",
    },
    {
      src: "/images/firewatch.jpg",
      alt: "firewatch",
      title: "Firewatch Sunset",
      description: "Serene mountain landscape from the game Firewatch.",
      category: "Gaming Art",
    },
  ];

  const lengthItems = images.length - 1;

  const nextSlide = useCallback(() => {
    setActive((active) => (active + 1 > lengthItems ? 0 : active + 1));
  }, [lengthItems]);

  const prevSlide = useCallback(() => {
    setActive((active) => (active - 1 < 0 ? lengthItems : active - 1));
  }, [lengthItems]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    },
    [nextSlide, prevSlide]
  );

  // Minimum swipe distance for a swipe gesture to be registered
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(nextSlide, 5000);

    // Add keyboard event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, handleKeyDown]);

  if (!isClient) {
    return null;
  }

  return (
    <div
      className="slider-container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button
        className="nav-button prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
          />
        </svg>
      </button>

      <button
        className="nav-button next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"
          />
        </svg>
      </button>

      <div className="slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === active ? "active" : ""}`}
            style={{
              transform: `translateX(${(index - active) * 100}%)`,
              opacity: 1,
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === active}
              style={{
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
              className="carousel-image"
            />
            <div className="image-info">
              <span className="image-category">{image.category}</span>
              <h2 className="image-title">{image.title}</h2>
              <p className="image-description">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === active ? "active" : ""}`}
            onClick={() => setActive(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
