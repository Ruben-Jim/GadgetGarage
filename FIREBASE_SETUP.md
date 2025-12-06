# Firebase Setup Guide

## Current Issue
You're experiencing "firebase/firestore uncaught error in snapshot listener" errors. This guide will help you resolve them.

## Required Setup

### 1. Environment Variables
Create a `.env` file in your project root with:

```bash
EXPO_FIREBASE_API_KEY=your_actual_firebase_api_key_here
EXPO_ADMIN_PASSWORD=your_admin_password_here
```

**Important**: Replace `your_actual_firebase_api_key_here` with your real Firebase API key from the Firebase Console.

### 2. Firebase Console Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `gadget-garage-4a721`
3. Go to Project Settings > General
4. Copy your Web API Key
5. Paste it in your `.env` file

### 3. Firestore Security Rules
Make sure your Firestore security rules allow read/write access. In Firebase Console > Firestore > Rules, use:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all users under any document
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Note**: These rules allow public access. For production, implement proper authentication.

### 4. Restart Your App
After setting up the environment variables:
1. Stop your Expo development server
2. Run `expo start --clear` to clear cache
3. Restart your app

## Common Error Codes

- **permission-denied**: Check Firestore security rules
- **unavailable**: Check internet connection and Firebase service status
- **unauthenticated**: Check API key configuration
- **not-found**: Check collection names and document paths

## Testing
1. Check browser console for Firebase initialization messages
2. Verify your API key is loaded (should see "Firebase initialized successfully")
3. Test basic Firestore operations before using real-time listeners

## Troubleshooting
If errors persist:
1. Verify API key is correct
2. Check Firebase project ID matches
3. Ensure Firestore is enabled in your project
4. Check browser console for detailed error messages
