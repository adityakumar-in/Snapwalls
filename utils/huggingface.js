export async function generateHuggingFaceImage(prompt, options = {}) {
  console.log('Starting HuggingFace image generation with:', { prompt, options });
  
  try {
    console.log('Making API request...');
    const response = await fetch(
      "https://api-inference.huggingface.co/models/SG161222/Realistic_Vision_V5.1_noVAE",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: prompt,
          wait_for_model: true,
          parameters: {
            width: options.width || 1024,
            height: options.height || 1024,
            num_inference_steps: 20,
            guidance_scale: 7.0,
            negative_prompt: "blurry, bad quality, watermark, text, low quality",
            scheduler: "DPMSolverMultistep",
          }
        }),
      }
    );

    console.log('API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Details:', errorText);
      
      if (response.status === 503) {
        const errorJson = JSON.parse(errorText);
        const waitTime = Math.ceil(errorJson.estimated_time || 20);
        throw new Error(`Model is loading. Please wait ${waitTime} seconds and try again.`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('Converting response to blob...');
    const blob = await response.blob();
    
    if (blob.size < 1000) {
      throw new Error('Generated image is too small, likely an error occurred');
    }
    
    console.log('Blob size:', blob.size);
    
    const url = URL.createObjectURL(blob);
    console.log('Created object URL:', url);
    
    return url;
  } catch (error) {
    console.error('Image generation failed:', error);
    throw error;
  }
} 