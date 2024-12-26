export async function generatePollinationImage(prompt, options = {}) {
    const baseUrl = 'https://image.pollinations.ai/prompt/';
    
    // Optimized parameters for euler_ancestral
    const params = new URLSearchParams({
        width: options.width || 7680,        // 8K resolution for max detail
        height: options.height || 4320,      // 8K resolution for max detail
        seed: options.seed || Math.floor(Math.random() * 1000000),
        model: options.model || 'flux',
        steps: options.num_inference_steps || 85,    // Optimal steps for euler_ancestral
        guidance: options.guidance_scale || 8.5,     // Perfect guidance value for detail
        scheduler: options.scheduler || 'euler_ancestral', // Best scheduler for quality
        timestamp: Date.now(),
    });

    // Enhanced quality boosters specifically optimized for euler_ancestral
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
        "hyperdetailed",
        "high dynamic range",
        options.width >= 7000 ? "8k uhd" : "4k uhd"
    ].join(", ");

    // Optimized prompt combination
    const enhancedPrompt = `${prompt}, ${qualityBoosters}, perfect composition, cinematic lighting, photorealistic quality`;
    const encodedPrompt = encodeURIComponent(enhancedPrompt);
    const imageUrl = `${baseUrl}${encodedPrompt}?${params}`;
    
    return imageUrl;
}