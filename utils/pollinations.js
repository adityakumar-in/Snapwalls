export async function generatePollinationImage(prompt, options = {}) {
    const baseUrl = 'https://image.pollinations.ai/prompt/';
    const params = new URLSearchParams({
        width: options.width || 3840,
        height: options.height || 2160,
        seed: options.seed || Math.floor(Math.random() * 1000000),
        model: options.model || 'flux',
        steps: options.steps || 30, 
        guidance: options.guidance || 7.5, 
        scheduler: 'K_EULER', 
        timestamp: Date.now(),
    });

    const enhancedPrompt = `${prompt}, high quality, detailed, sharp, 8k uhd`;
    const encodedPrompt = encodeURIComponent(enhancedPrompt);
    const imageUrl = `${baseUrl}${encodedPrompt}?${params}`;
    
    return imageUrl;
}