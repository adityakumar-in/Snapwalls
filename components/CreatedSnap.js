'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import '/app/styles/createdSnap.css';
import { useRouter } from 'next/navigation';

const CreatedSnap = ({ wallpapers = [], prompt = '' }) => {
    const router = useRouter();
    const [loadingStates, setLoadingStates] = useState({});
    const [previewWallpaper, setPreviewWallpaper] = useState(null);
    const [isModalActive, setIsModalActive] = useState(false);

    const getWallpaperDimensions = (type) => {
        switch (type) {
            case 'Mobile':
                return { width: 390, height: 844 };
            case 'Desktop':
                return { width: 1920, height: 1080 };
            default:
                return { width: 1440, height: 900 };
        }
    };

    const handleDownload = async (imageUrl, type, index) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `snapwalls-${type.toLowerCase()}-${index + 1}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    const handleImageLoad = (index) => {
        setLoadingStates(prev => ({
            ...prev,
            [index]: false
        }));
    };

    const openPreview = (wallpaper) => {
        setPreviewWallpaper(wallpaper);
        setIsModalActive(true);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    };

    const closePreview = () => {
        setPreviewWallpaper(null);
        setIsModalActive(false);
        // Restore body scroll
        document.body.style.overflow = 'unset';
    };

    return (
        <div className='default-padding'>
            <div className="wallpaper-preview-container">
                <div className="wallpaper-header">
                    <div className="header-content">
                        <h1>Your Generated Wallpapers</h1>
                        <button 
                            className="back-button" 
                            onClick={() => {
                                router.push('/create');
                                localStorage.removeItem('generatedImages');
                                localStorage.removeItem('searchInput');
                                window.location.href = '/create';
                            }}
                        >
                            <span className="back-icon">←</span>
                            Back to Create
                        </button>
                        {prompt && <p className="prompt-text">{prompt}</p>}
                    </div>
                </div>
                
                <div className="wallpapers-grid">
                    {wallpapers.length === 0 ? (
                        <div className="no-wallpapers">
                            <p>No wallpapers generated yet.</p>
                            <p>Go back to create some amazing wallpapers!</p>
                        </div>
                    ) : (
                        wallpapers.map((wallpaper, index) => {
                            const dimensions = getWallpaperDimensions(wallpaper?.type || 'Desktop');
                            return (
                                <div key={index} className="wallpaper-card">
                                    <div className="wallpaper-card-header">
                                        <div className="wallpaper-info">
                                            <span className="tag">{wallpaper?.type || 'Custom'}</span>
                                            <span className="resolution">{dimensions.width} x {dimensions.height}</span>
                                        </div>
                                    </div>
                                    <div className="wallpaper-frame-container">
                                        <div className="wallpaper-frame">
                                            <div className="image-wrapper">
                                                <Image 
                                                    src={wallpaper?.imageUrl || '/placeholder-image.jpg'} 
                                                    alt={`Generated Wallpaper ${index + 1}`} 
                                                    className={`wallpaper-image ${loadingStates[index] ? 'loading' : 'loaded'}`}
                                                    width={dimensions.width}
                                                    height={dimensions.height}
                                                    priority={index < 2}
                                                    onLoadingComplete={() => handleImageLoad(index)}
                                                    style={{
                                                        objectFit: 'cover',
                                                        width: '100%',
                                                        height: '100%'
                                                    }}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    quality={100}
                                                />
                                                {loadingStates[index] && (
                                                    <div className="loading-overlay">
                                                        <div className="loading-spinner"></div>
                                                    </div>
                                                )}
                                                <div className="preview-overlay">
                                                    <div className="preview-content" onClick={() => openPreview(wallpaper)}>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                            <circle cx="12" cy="12" r="3"></circle>
                                                        </svg>
                                                        <span>Preview</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        className="download-button" 
                                        onClick={() => handleDownload(wallpaper?.imageUrl, wallpaper?.type || 'wallpaper', index)}
                                        disabled={loadingStates[index] || !wallpaper?.imageUrl}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        Download
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Preview Modal */}
            {isModalActive && previewWallpaper && (
                <div className={`preview-modal-overlay active`} onClick={closePreview}>
                    <div className={`preview-modal active`} onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closePreview}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <div className="modal-image-container">
                            <Image
                                src={previewWallpaper.imageUrl}
                                alt="Wallpaper Preview"
                                className="modal-image"
                                width={getWallpaperDimensions(previewWallpaper.type).width}
                                height={getWallpaperDimensions(previewWallpaper.type).height}
                                quality={100}
                            />
                        </div>
                        <div className="modal-actions">
                            <button 
                                className="modal-download"
                                onClick={() => {
                                    handleDownload(previewWallpaper.imageUrl, previewWallpaper.type || 'wallpaper', 0);
                                    closePreview();
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Download Wallpaper
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>    
    );
};

export default CreatedSnap;
