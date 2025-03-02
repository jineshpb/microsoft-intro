import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get('videoId')

    if (!videoId) {
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 })
    }

    // We're not using the API route anymore since we're using direct iframe embedding
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ 
      error: 'API error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
