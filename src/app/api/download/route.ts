import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get('url');
  const filename = searchParams.get('filename') || 'notice.jpg';

  if (!fileUrl) {
    return new NextResponse('Missing file url parameter', { status: 400 });
  }

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      return new NextResponse('Failed to fetch target file', { status: response.status });
    }

    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err) {
    return new NextResponse('Failed to process download', { status: 500 });
  }
}
