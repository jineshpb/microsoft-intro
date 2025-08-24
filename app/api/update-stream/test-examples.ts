// Test examples for YouTube URL validation and extraction
// This file demonstrates how the YouTube URL parsing works

// Example YouTube URLs that should be valid:
const validYouTubeUrls = [
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://youtu.be/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "https://www.youtube.com/v/dQw4w9WgXcQ",
  "http://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "youtube.com/watch?v=dQw4w9WgXcQ",
  "www.youtube.com/watch?v=dQw4w9WgXcQ",
];

// Example invalid URLs:
const invalidUrls = [
  "https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw",
  "https://www.youtube.com/playlist?list=PLbpi6ZahtOH6BlwajRGYVX6e3T9H_Ldyx",
  "https://www.google.com",
  "not-a-url",
  "https://www.youtube.com/watch",
  "https://www.youtube.com/watch?v=",
  "https://www.youtube.com/watch?v=short",
];

// Expected video IDs for the valid URLs above:
const expectedVideoIds = [
  "dQw4w9WgXcQ",
  "dQw4w9WgXcQ",
  "dQw4w9WgXcQ",
  "dQw4w9WgXcQ",
  "dQw4w9WgXcQ",
  "dQw4w9WgXcQ",
  "dQw4w9WgXcQ",
];

// Usage examples for the API:
const apiUsageExamples = {
  // Using YouTube URL
  withYouTubeUrl: {
    method: "POST",
    url: "/api/update-stream",
    body: {
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      updatedBy: "user123",
    },
  },

  // Get current stream
  getCurrentStream: {
    method: "GET",
    url: "/api/update-stream",
  },
};

export { validYouTubeUrls, invalidUrls, expectedVideoIds, apiUsageExamples };
