import { NextResponse } from 'next/server';

// Mark this route as dynamic
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
    const filename = searchParams.get('filename');

    if (!imageUrl || !filename) {
      return new NextResponse('Missing required parameters', { status: 400 });
    }

    const response = await fetch(imageUrl, {
      headers: {
        'Accept': 'image/*',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const blob = await response.blob();

    // Create response with proper headers for download
    return new NextResponse(blob, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return new NextResponse(`Error downloading file: ${error.message}`, { status: 500 });
  }
}
