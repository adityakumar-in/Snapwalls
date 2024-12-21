export async function generatePollinationImage(prompt, options = {}) {
    const baseUrl = 'https://image.pollinations.ai/prompt/';
    const params = new URLSearchParams({
        width: options.width || 1024,
        height: options.height || 1024,
        seed: Math.floor(Math.random() * 1000000),
        model: options.model || 'flux',
        timestamp: Date.now(),
    });

    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `${baseUrl}${encodedPrompt}?${params}`;
    
    // Return the URL - the image will be generated when the URL is accessed
    return imageUrl;
}