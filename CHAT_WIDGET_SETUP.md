# Chat Widget Setup Guide

## Configuration

To configure the chat widget for your website, you need to update the webhook URL in the configuration file.

### Step 1: Update Webhook URL

Open the file `src/config/chatWidget.ts` and replace `'YOUR-URL-HERE'` with your actual webhook URL:

```typescript
export const chatWidgetConfig = {
  webhook: {
    url: 'https://your-webhook-url.com/webhook', // Replace with your actual webhook URL
    route: 'general'
  },
  // ... rest of config
};
```

### Step 2: Customize Appearance (Optional)

You can customize the chat widget's appearance by modifying the style properties in the same configuration file:

```typescript
style: {
  primaryColor: '#9333ea',     // Main color for buttons and header
  secondaryColor: '#7c3aed',   // Secondary color (currently unused)
  position: 'right',           // Position (currently only 'right' is supported)
  backgroundColor: '#ffffff',   // Background color of the chat window
  fontColor: '#333333'         // Text color (currently uses default)
}
```

## Features

- **Persistent Chat State**: The chat maintains its state (messages and open/closed status) across page navigation
- **Session Management**: Each chat session has a unique ID stored in sessionStorage
- **Responsive Design**: The widget is mobile-friendly and adapts to different screen sizes
- **Loading States**: Shows typing indicators when waiting for bot responses
- **Error Handling**: Gracefully handles connection errors with user-friendly messages

## Webhook Integration

Your webhook endpoint should:

1. Accept POST requests with the following JSON structure:
```json
{
  "chatId": "chat_abc123",
  "message": "User's message",
  "route": "general"
}
```

2. Return a JSON response with:
```json
{
  "output": "Bot's response message"
}
```

## Testing

1. Update the webhook URL in the configuration
2. Run your development server: `npm run dev`
3. Click the chat button in the bottom-right corner
4. Send a test message to verify the webhook integration

## Deployment

The chat widget configuration is included in your build, so make sure to:

1. Update the webhook URL before building for production
2. Test the integration in your staging environment
3. Ensure your webhook endpoint is accessible from your production domain

## Troubleshooting

- **Chat not appearing**: Check browser console for errors and verify the ChatWidget component is imported in App.tsx
- **Messages not sending**: Verify your webhook URL is correct and accessible
- **State not persisting**: Ensure sessionStorage is not being cleared by browser settings 