#!/bin/bash

echo "🧪 Testing YouTube URL with query parameters..."

# Test the specific URL that was causing issues
curl -X POST http://localhost:3000/api/update-stream \
  -H "Content-Type: application/json" \
  -d '{
    "youtubeUrl": "https://youtu.be/9LWgmOK8jss?si=LOagDSL3GY9sVupw",
    "updatedBy": "test-user"
  }' \
  | jq '.'

echo -e "\n📺 Checking current stream..."
curl http://localhost:3000/api/update-stream | jq '.'

echo -e "\n✅ Test completed!"
