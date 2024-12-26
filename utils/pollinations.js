export async function generatePollinationImage(prompt, options = {}) {
    const baseUrl = 'https://image.pollinations.ai/prompt/';
    
    // Enhanced default parameters for better quality
    const params = new URLSearchParams({
        width: options.width || 3840,
        height: options.height || 2160,
        seed: options.seed || Math.floor(Math.random() * 1000000),
        model: options.model || 'flux',
        steps: options.num_inference_steps || 50,    // Increased steps for better detail
        guidance: options.guidance_scale || 7.5,     // Balanced guidance scale
        scheduler: options.scheduler || 'dpm++_2m_karras', // Better quality scheduler
        timestamp: Date.now(),
    });

    // Enhanced prompt with quality boosters and artistic elements
    const qualityBoosters = [
        "masterpiece",
        "best quality",
        "ultra detailed",
        "sharp focus",
        "high resolution",
        "professional",
        "detailed texture",
        "intricate details",
        "crystal clear",
        options.width >= 7000 ? "8k uhd" : "4k uhd"
    ].join(", ");

    // Combine original prompt with quality boosters
    const enhancedPrompt = `${prompt}, ${qualityBoosters}, high dynamic range, perfect composition, cinematic lighting`;
    const encodedPrompt = encodeURIComponent(enhancedPrompt);
    const imageUrl = `${baseUrl}${encodedPrompt}?${params}`;
    
    return imageUrl;
}