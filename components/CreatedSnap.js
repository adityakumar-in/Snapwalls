'use client'
import React from 'react';
import Image from 'next/image';
import '/app/styles/createdSnap.css';
import { useRouter } from 'next/navigation';

const CreatedSnap = ({ imageUrl, selectedTag }) => {
    const router = useRouter();

    const getWidth = () => {
        return selectedTag === 'Mobile' ? 720 : selectedTag === '' ? window.innerWidth : 1280;
    }

    const getHeight = () => {
        return selectedTag === 'Mobile' ? 1280 : selectedTag === '' ? window.innerHeight : 720;
    }

    const handleDownload = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `wallpaper-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <div className='default-padding'>
            <div className="choose-roadmap-page">
                <button 
                    className="back-button" 
                    onClick={() => router.push('/create')}
                >
                    ← Back to Create
                </button>
                <div className="choose-roadmap-header">
                    <div className="header-content">
                        <div className="header-main">
                            <h1 className='choose-roadmap-title'>Generated Wallpaper</h1>
                            <Image 
                                src={imageUrl} 
                                alt="Generated Wallpaper" 
                                className="generated-wallpaper"
                                width={getWidth()}
                                height={getHeight()} 
                                priority
                            />
                            <button className="download-button" onClick={handleDownload}>
                                Download Wallpaper
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    );
};

export default CreatedSnap;
