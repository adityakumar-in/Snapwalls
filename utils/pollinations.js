export async function generatePollinationImage(prompt, options = {}) {
    const baseUrl = 'https://image.pollinations.ai/prompt/';
    const params = new URLSearchParams({
        width: options.width || 1024,
        height: options.height || 1024,
        seed: options.seed || Math.floor(Math.random() * 1000000),
        model: options.model || 'flux',
    });

    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `${baseUrl}${encodedPrompt}?${params}`;
    
    // Return a promise that resolves when the image loads
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(imageUrl);
        img.onerror = () => reject(new Error('Failed to generate image'));
        img.src = imageUrl;
    });
}