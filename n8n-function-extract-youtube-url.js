// Function Node - "Extract YouTube URL"
const message = items[0].json.message;
const text = message.text;
const chatId = message.chat.id;

// Check if command has a parameter
const youtubeUrl = text.split("/setstream ")[1]?.trim();

if (!youtubeUrl) {
  return {
    json: {
      chatId: chatId,
      error: true,
      message:
        "❌ Please provide a YouTube URL.\nUsage: /setstream https://youtube.com/watch?v=VIDEO_ID",
    },
  };
}

return {
  json: {
    chatId: chatId,
    userId: message.from.id,
    youtubeUrl: youtubeUrl,
    timestamp: new Date().toISOString(),
    userName: `${message.from.first_name} ${message.from.last_name}`.trim(),
  },
};
