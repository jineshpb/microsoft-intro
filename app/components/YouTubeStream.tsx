'use client'
import React from 'react'

interface YouTubeStreamProps {
  streamKey: string
}

export function YouTubeStream({ streamKey }: YouTubeStreamProps) {
  return (
    <div style={{ 
      position: 'fixed', 

      width: '320px',
      height: '180px',
      zIndex: 1000 
    }}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${streamKey}?autoplay=1&mute=1&controls=1&enablejsapi=1&playsinline=1&loop=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={{ border: 'none' }}
      />
    </div>
  )
}
