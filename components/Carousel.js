"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import '@/app/styles/carousel.css';

const Carousel = () => {
    const [active, setActive] = useState(0);
    const [isClient, setIsClient] = useState(false);

    const images = [
        { src: "/images/spiderrman.jpg", alt: "spiderman" },
        { src: "/images/cyberpunk.jpg", alt: "cyberpunk" },
        { src: "/images/tanjiro3.png", alt: "tanjiro" },
        { src: "/images/animegirl.webp", alt: "anime-girl" },
        { src: "/images/firewatch.jpg", alt: "firewatch" }
    ];

    const lengthItems = images.length - 1;

    const nextSlide = useCallback(() => {
        setActive(active => active + 1 > lengthItems ? 0 : active + 1);
    }, [lengthItems]);

    const prevSlide = useCallback(() => {
        setActive(active => active - 1 < 0 ? lengthItems : active - 1);
    }, [lengthItems]);

    useEffect(() => {
        setIsClient(true);
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    if (!isClient) {
        return null;
    }

    return (
        <div className="slider-container">
            <div className="slider">
                {images.map((image, index) => (
                    <div key={index} className={`slide ${index === active ? 'active' : ''}`}>
                        <Image 
                            src={image.src} 
                            alt={image.alt} 
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                ))}
            </div>
            
            <div className="dots">
                {images.map((_, index) => (
                    <span 
                        key={index} 
                        className={`dot ${index === active ? 'active' : ''}`}
                        onClick={() => setActive(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Carousel;