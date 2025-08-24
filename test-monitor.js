// Test script for MonitorScreen functionality
// Run with: node test-monitor.js

const BASE_URL = "http://localhost:3000";

// Test YouTube URLs
const testUrls = [
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Rick Roll
  "https://www.youtube.com/watch?v=jNQXAC9IVRw", // Me at the zoo (first YouTube video)
  "https://youtu.be/dQw4w9WgXcQ", // Short URL format
  "https://youtu.be/9LWgmOK8jss?si=LOagDSL3GY9sVupw", // Your URL with query params
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s", // With timestamp
  "https://youtu.be/dQw4w9WgXcQ?feature=shared", // With feature parameter
];

async function testMonitor() {
  console.log("🎬 Testing MonitorScreen functionality...\n");

  for (let i = 0; i < testUrls.length; i++) {
    const url = testUrls[i];
    console.log(`📺 Testing URL ${i + 1}: ${url}`);

    try {
      // Set the YouTube URL
      const setResponse = await fetch(`${BASE_URL}/api/update-stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          youtubeUrl: url,
          updatedBy: "test-script",
        }),
      });

      const setData = await setResponse.json();

      if (setData.success) {
        console.log("✅ Successfully set stream key:", setData.currentKey);

        // Check the embed URL
        const getResponse = await fetch(`${BASE_URL}/api/update-stream`);
        const getData = await getResponse.json();

        if (getData.embedUrl) {
          console.log("🎥 Embed URL generated:", getData.embedUrl);
        } else {
          console.log("❌ No embed URL returned");
        }
      } else {
        console.log("❌ Failed to set stream:", setData.error);
      }
    } catch (error) {
      console.log("❌ Error:", error.message);
    }

    console.log("---");

    // Wait 2 seconds between tests
    if (i < testUrls.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  console.log("🎉 Test completed! Check your browser at http://localhost:3000");
  console.log("💡 The monitor should now display the last tested video");
}

// Run the test
testMonitor().catch(console.error);
