'use client'
import React from 'react';
import Image from 'next/image';
import '/app/styles/createdSnap.css';
import { useRouter } from 'next/navigation';

const CreatedSnap = ({ imageUrl, selectedTag }) => {
    const router = useRouter();

    const getWidth = () => {
        switch (selectedTag) {
            case 'Mobile':
                return 390; // Standard mobile width
            case 'Desktop':
                return 1280; // Standard desktop width
            default:
                return 800; // Default/custom width
        }
    }

    const getHeight = () => {
        switch (selectedTag) {
            case 'Mobile':
                return 844; // Standard mobile height
            case 'Desktop':
                return 720; // Standard desktop height
            default:
                return 600; // Default/custom height
        }
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
                            <div className="image-container">
                                <Image 
                                    src={imageUrl} 
                                    alt="Generated Wallpaper" 
                                    className="generated-wallpaper"
                                    width={getWidth()}
                                    height={getHeight()} 
                                    priority
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxWidth: getWidth(),
                                        objectFit: 'contain'
                                    }}
                                />
                            </div>
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
